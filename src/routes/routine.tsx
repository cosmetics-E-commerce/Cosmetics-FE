/* eslint-disable react-refresh/only-export-components -- exported pure journey helpers are covered by unit tests. */
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  ArrowRight,
  ArrowLeftRight,
  Check,
  ChevronDown,
  ChevronUp,
  Clock3,
  LoaderCircle,
  Moon,
  RotateCcw,
  ShoppingBag,
  Sparkles,
  Sun,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  apiErrorMessage,
  evaluateRoutine,
  getRoutineBuilder,
  recordRoutineEvent,
  startRoutineSession,
  type RoutinePublicConfig,
  type RoutinePublicQuestion,
  type RoutineRecommendationStep,
  type RoutineResult,
} from "@/lib/api";
import { createSeoHead } from "@/lib/seo";
import { useStore } from "@/lib/store";
import "@/styles/routine-builder.css";

type Answers = Record<string, string | number | boolean | string[]>;

export const Route = createFileRoute("/routine")({
  head: ({ match }) => {
    const ar = match.search.lang === "ar";
    return createSeoHead({
      title: ar ? "ابني روتينك | BioReza" : "Build Your Routine | BioReza",
      description: ar
        ? "كوّني روتين عناية مخصصاً وفقاً لاختياراتك ومنتجات BioReza المتاحة."
        : "Build a personalized product routine around your preferences and BioReza's live catalog.",
      path: "/routine",
      locale: ar ? "ar" : "en",
      index: true,
      follow: true,
    });
  },
  component: RoutinePage,
});

function RoutinePage() {
  const { locale } = useStore();
  const query = useQuery({
    queryKey: ["routine-builder", "published"],
    queryFn: getRoutineBuilder,
    retry: false,
  });
  if (query.isLoading)
    return (
      <main className="sf-routine sf-routine--loading">
        <LoaderCircle className="animate-spin" aria-hidden="true" />
        <p>{locale === "ar" ? "جارٍ تجهيز التجربة…" : "Preparing your routine…"}</p>
      </main>
    );
  if (query.isError || !query.data) return <RoutineUnavailable error={query.error} />;
  return <RoutineExperience snapshot={query.data} />;
}

function RoutineExperience({ snapshot }: { snapshot: RoutinePublicConfig }) {
  const { locale, add, setCartOpen } = useStore();
  const ar = locale === "ar";
  const [phase, setPhase] = useState<"intro" | "questions" | "result">("intro");
  const [sessionId, setSessionId] = useState<string | undefined>();
  const [answers, setAnswers] = useState<Answers>({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [result, setResult] = useState<RoutineResult | null>(null);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [selectedSteps, setSelectedSteps] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);
  const config = snapshot.config;
  const visible = useMemo(
    () => visibleRoutineQuestions(config.questions, answers),
    [answers, config.questions],
  );
  const question = visible[Math.min(questionIndex, Math.max(0, visible.length - 1))];
  const text = (value: { en: string; ar: string }) => value[locale];

  useEffect(() => {
    const visibleKeys = new Set(visible.map((item) => item.key));
    setAnswers((current) => {
      const cleaned = Object.fromEntries(
        Object.entries(current).filter(([key]) => visibleKeys.has(key)),
      );
      return Object.keys(cleaned).length === Object.keys(current).length ? current : cleaned;
    });
    setQuestionIndex((current) => Math.min(current, Math.max(0, visible.length - 1)));
  }, [visible]);

  useEffect(() => {
    if (!sessionId || phase !== "questions" || result) return;
    const recordAbandonment = () => {
      void recordRoutineEvent(sessionId, {
        type: "BUILDER_ABANDONED",
        ...(question?.key ? { questionKey: question.key } : {}),
      }).catch(() => undefined);
    };
    window.addEventListener("pagehide", recordAbandonment, { once: true });
    return () => window.removeEventListener("pagehide", recordAbandonment);
  }, [phase, question?.key, result, sessionId]);

  const start = async () => {
    setBusy(true);
    try {
      const session = await startRoutineSession(locale);
      setSessionId(session.sessionId);
      setPhase("questions");
    } catch (error) {
      toast.error(apiErrorMessage(error));
    } finally {
      setBusy(false);
    }
  };

  const advance = async () => {
    if (!question) return;
    if (!answerComplete(question, answers[question.key])) {
      toast.error(ar ? "اختاري إجابة للمتابعة." : "Choose an answer to continue.");
      return;
    }
    if (sessionId)
      void recordRoutineEvent(sessionId, {
        type: "QUESTION_ANSWERED",
        questionKey: question.key,
      }).catch(() => undefined);
    if (questionIndex < visible.length - 1) {
      setQuestionIndex((value) => value + 1);
      return;
    }
    await generate();
  };

  const generate = async (variants = selectedVariants) => {
    setBusy(true);
    try {
      const next = await evaluateRoutine({
        ...(sessionId ? { sessionId } : {}),
        answers,
        locale,
        selectedVariants: variants,
      });
      setSessionId(next.sessionId);
      setResult(next);
      setSelectedVariants(
        Object.fromEntries(
          [...next.morningSteps, ...next.eveningSteps].map((step) => [
            step.id,
            step.product.variantId,
          ]),
        ),
      );
      setSelectedSteps(
        new Set([...next.morningSteps, ...next.eveningSteps].map((step) => step.id)),
      );
      setPhase("result");
    } catch (error) {
      toast.error(apiErrorMessage(error));
    } finally {
      setBusy(false);
    }
  };

  const swap = async (step: RoutineRecommendationStep, variantId: string) => {
    const next = { ...selectedVariants, [step.id]: variantId };
    setSelectedVariants(next);
    if (sessionId)
      void recordRoutineEvent(sessionId, {
        type: "PRODUCT_SWAPPED",
        productId: step.product.productId,
      }).catch(() => undefined);
    await generate(next);
  };

  const addSelected = async () => {
    if (!result || busy) return;
    setBusy(true);
    try {
      // Re-run the authoritative engine immediately before cart mutations.
      const fresh = await evaluateRoutine({
        ...(sessionId ? { sessionId } : {}),
        answers,
        locale,
        selectedVariants,
      });
      const unique = new Map(
        [...fresh.morningSteps, ...fresh.eveningSteps]
          .filter((step) => selectedSteps.has(step.id))
          .map((step) => [step.product.variantId, step.product]),
      );
      let added = 0;
      for (const product of unique.values()) {
        const ok = await add({
          variantId: product.variantId,
          productId: product.productId,
          slug: product.slug,
          name: product.name,
          image: product.imageUrl ?? undefined,
          size: product.variantName,
          price: product.price / 100,
          qty: 1,
        });
        if (ok) added += 1;
      }
      if (sessionId)
        void recordRoutineEvent(sessionId, {
          type:
            selectedSteps.size === unique.size
              ? "ROUTINE_ADD_TO_CART"
              : "ROUTINE_PRODUCT_ADD_TO_CART",
        }).catch(() => undefined);
      if (added) {
        toast.success(
          ar ? `تمت إضافة ${added} منتجات إلى الحقيبة.` : `${added} products added to your bag.`,
        );
        setCartOpen(true);
      }
    } catch (error) {
      toast.error(apiErrorMessage(error));
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="sf-routine" dir={ar ? "rtl" : "ltr"}>
      {phase === "intro" ? (
        <section className="sf-routine-intro">
          <div className="sf-routine-intro__texture" aria-hidden="true">
            <span>BR</span>
            <span>01—{String(config.questions.length).padStart(2, "0")}</span>
          </div>
          <div className="sf-routine-intro__copy">
            <p className="sf-routine-eyebrow">
              {ar ? "إرشادات BioReza المخصصة" : "BioReza personal guidance"}
            </p>
            <h1>{text(config.title)}</h1>
            <p>{text(config.introduction)}</p>
            <div className="sf-routine-intro__meta">
              <span>
                <Clock3 aria-hidden="true" />
                {ar
                  ? `حوالي ${config.estimatedMinutes} دقائق`
                  : `Around ${config.estimatedMinutes} minutes`}
              </span>
              <span>
                <Sparkles aria-hidden="true" />
                {ar ? "وفقاً لاختياراتك" : "Built from your choices"}
              </span>
            </div>
            <Button size="lg" onClick={start} loading={busy}>
              {text(config.startLabel)} {ar ? <ArrowLeft /> : <ArrowRight />}
            </Button>
            <small>{text(config.disclaimer)}</small>
          </div>
        </section>
      ) : null}

      {phase === "questions" && question ? (
        <section className="sf-routine-question-shell">
          <header>
            <button
              type="button"
              onClick={() =>
                questionIndex ? setQuestionIndex((value) => value - 1) : setPhase("intro")
              }
              aria-label={ar ? "رجوع" : "Back"}
            >
              {ar ? <ArrowRight /> : <ArrowLeft />}
            </button>
            <div className="sf-routine-progress">
              <div>
                <span>{ar ? "الملف" : "Profile"}</span>
                <b>
                  {questionIndex + 1} / {visible.length}
                </b>
              </div>
              <progress value={questionIndex + 1} max={visible.length} />
            </div>
            <span className="sf-routine-version">v{snapshot.version}</span>
          </header>
          <div className="sf-routine-question">
            <p className="sf-routine-eyebrow">
              {ar ? `الخطوة ${questionIndex + 1}` : `Step ${questionIndex + 1}`}
            </p>
            <h1>{text(question.label)}</h1>
            {text(question.description) ? <p>{text(question.description)}</p> : null}
            <QuestionControl
              question={question}
              value={answers[question.key]}
              locale={locale}
              onChange={(value) => setAnswers((current) => ({ ...current, [question.key]: value }))}
            />
            <footer>
              <span>{text(question.helpText)}</span>
              <Button size="lg" onClick={advance} loading={busy}>
                {questionIndex === visible.length - 1
                  ? ar
                    ? "كوّني روتيني"
                    : "Build my routine"
                  : ar
                    ? "متابعة"
                    : "Continue"}{" "}
                {ar ? <ArrowLeft /> : <ArrowRight />}
              </Button>
            </footer>
          </div>
        </section>
      ) : null}

      {phase === "result" && result ? (
        <RoutineResultView
          result={result}
          config={snapshot}
          locale={locale}
          selected={selectedSteps}
          busy={busy}
          onToggle={(id) =>
            setSelectedSteps((current) => {
              const next = new Set(current);
              if (next.has(id)) next.delete(id);
              else next.add(id);
              return next;
            })
          }
          onSwap={swap}
          onAdd={addSelected}
          onRestart={() => {
            setAnswers({});
            setResult(null);
            setQuestionIndex(0);
            setPhase("intro");
          }}
        />
      ) : null}
    </main>
  );
}

function QuestionControl({
  question,
  value,
  locale,
  onChange,
}: {
  question: RoutinePublicQuestion;
  value: Answers[string] | undefined;
  locale: "en" | "ar";
  onChange: (value: Answers[string]) => void;
}) {
  const multiple = question.type === "MULTIPLE_CHOICE" || question.type === "RANKED_CHOICE";
  const selected = Array.isArray(value) ? value : value == null ? [] : [String(value)];
  const toggle = (key: string) => {
    if (!multiple) return onChange(key);
    const next = selected.includes(key)
      ? selected.filter((item) => item !== key)
      : [...selected, key].slice(0, question.maxSelections);
    onChange(next);
  };
  if (question.type === "OPTIONAL_TEXT")
    return (
      <textarea
        className="sf-routine-text"
        value={String(value ?? "")}
        onChange={(event) => onChange(event.target.value)}
        maxLength={2000}
      />
    );
  if (question.type === "NUMERIC_RANGE")
    return (
      <input
        className="sf-routine-number"
        type="number"
        value={typeof value === "number" ? value : ""}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    );
  if (question.type === "SCALE" && question.scale)
    return (
      <div className="sf-routine-scale">
        <input
          type="range"
          min={question.scale.min}
          max={question.scale.max}
          step={question.scale.step}
          value={typeof value === "number" ? value : question.scale.min}
          onChange={(event) => onChange(Number(event.target.value))}
        />
        <output>{typeof value === "number" ? value : question.scale.min}</output>
      </div>
    );
  return (
    <div className="sf-routine-answers">
      {question.answers
        .sort((a, b) => a.order - b.order)
        .map((answer) => {
          const rank = selected.indexOf(answer.key);
          return (
            <div className="sf-routine-answer-card" key={answer.id}>
              <button type="button" aria-pressed={rank >= 0} onClick={() => toggle(answer.key)}>
                <span className="sf-routine-answer-marker">
                  {question.type === "RANKED_CHOICE" && rank >= 0 ? (
                    rank + 1
                  ) : rank >= 0 ? (
                    <Check />
                  ) : null}
                </span>
                <span>
                  <strong>{answer.label[locale]}</strong>
                  {answer.description[locale] ? <small>{answer.description[locale]}</small> : null}
                </span>
              </button>
              {question.type === "RANKED_CHOICE" && rank >= 0 ? (
                <span className="sf-routine-rank-actions">
                  <button
                    type="button"
                    aria-label="Move up"
                    disabled={rank === 0}
                    onClick={() => onChange(moveRank(selected, rank, -1))}
                  >
                    <ChevronUp />
                  </button>
                  <button
                    type="button"
                    aria-label="Move down"
                    disabled={rank === selected.length - 1}
                    onClick={() => onChange(moveRank(selected, rank, 1))}
                  >
                    <ChevronDown />
                  </button>
                </span>
              ) : null}
            </div>
          );
        })}
    </div>
  );
}

function RoutineResultView({
  result,
  config,
  locale,
  selected,
  busy,
  onToggle,
  onSwap,
  onAdd,
  onRestart,
}: {
  result: RoutineResult;
  config: RoutinePublicConfig;
  locale: "en" | "ar";
  selected: Set<string>;
  busy: boolean;
  onToggle: (id: string) => void;
  onSwap: (step: RoutineRecommendationStep, variantId: string) => Promise<void>;
  onAdd: () => Promise<void>;
  onRestart: () => void;
}) {
  const ar = locale === "ar";
  const text = (value: { en: string; ar: string }) => value[locale];
  return (
    <section className="sf-routine-result">
      <header>
        <div>
          <p className="sf-routine-eyebrow">
            {ar ? "مختار وفقاً لإجاباتك" : "Selected from your answers"}
          </p>
          <h1>{text(config.config.resultTitle)}</h1>
          <p>{result.profileSummary.join(" · ")}</p>
        </div>
        <button type="button" onClick={onRestart}>
          <RotateCcw />
          {ar ? "ابدئي من جديد" : "Start again"}
        </button>
      </header>
      {result.noResult ? (
        <div className="sf-routine-no-result">
          <Sparkles />
          <h2>{result.noResultMessage}</h2>
          <p>{text(config.config.disclaimer)}</p>
          <Button asChild>
            <Link to="/shop">{ar ? "تصفحي المنتجات" : "Explore products"}</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="sf-routine-result__columns">
            <RoutinePeriod
              title={ar ? "الصباح" : "Morning"}
              icon={Sun}
              steps={result.morningSteps}
              locale={locale}
              selected={selected}
              onToggle={onToggle}
              onSwap={onSwap}
            />
            <RoutinePeriod
              title={ar ? "المساء" : "Evening"}
              icon={Moon}
              steps={result.eveningSteps}
              locale={locale}
              selected={selected}
              onToggle={onToggle}
              onSwap={onSwap}
            />
          </div>
          <aside className="sf-routine-cart-bar">
            <div>
              <span>{ar ? `${selected.size} خطوات محددة` : `${selected.size} steps selected`}</span>
              <strong>{formatMoney(selectedTotal(result, selected), locale)}</strong>
              <small>
                {ar
                  ? "سيتم تأكيد السعر والتوفر قبل الإضافة."
                  : "Price and availability are revalidated before adding."}
              </small>
            </div>
            <Button size="lg" onClick={onAdd} loading={busy} disabled={!selected.size}>
              <ShoppingBag />
              {ar ? "أضيفي المحدد إلى الحقيبة" : "Add selected to bag"}
            </Button>
          </aside>
        </>
      )}
    </section>
  );
}

function RoutinePeriod({
  title,
  icon: Icon,
  steps,
  locale,
  selected,
  onToggle,
  onSwap,
}: {
  title: string;
  icon: typeof Sun;
  steps: RoutineRecommendationStep[];
  locale: "en" | "ar";
  selected: Set<string>;
  onToggle: (id: string) => void;
  onSwap: (step: RoutineRecommendationStep, variantId: string) => Promise<void>;
}) {
  return (
    <section className="sf-routine-period">
      <h2>
        <Icon />
        {title}
      </h2>
      <div>
        {steps.map((step, index) => (
          <article key={step.id} className="sf-routine-product">
            <label className="sf-routine-select">
              <input
                type="checkbox"
                checked={selected.has(step.id)}
                onChange={() => onToggle(step.id)}
              />
              <span>{String(index + 1).padStart(2, "0")}</span>
            </label>
            <Link
              to="/product/$slug"
              params={{ slug: step.product.slug }}
              className="sf-routine-product__image"
            >
              {step.product.imageUrl ? <img src={step.product.imageUrl} alt="" /> : <Sparkles />}
            </Link>
            <div className="sf-routine-product__copy">
              <p>{step.roleLabel}</p>
              <Link to="/product/$slug" params={{ slug: step.product.slug }}>
                <h3>{step.product.name}</h3>
              </Link>
              <span>{step.product.variantName}</span>
              <small>{step.product.explanation}</small>
              {step.warnings.map((warning) => (
                <em key={warning}>{warning}</em>
              ))}
              {step.alternatives.length ? (
                <details>
                  <summary>
                    <ArrowLeftRight />
                    {locale === "ar" ? "استبدلي المنتج" : "Swap product"}
                  </summary>
                  {step.alternatives.map((product) => (
                    <button
                      type="button"
                      key={product.variantId}
                      onClick={() => void onSwap(step, product.variantId)}
                    >
                      <span>{product.name}</span>
                      <b>{formatMoney(product.price, locale)}</b>
                    </button>
                  ))}
                </details>
              ) : null}
            </div>
            <strong>{formatMoney(step.product.price, locale)}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function RoutineUnavailable({ error }: { error: unknown }) {
  const { locale } = useStore();
  return (
    <main className="sf-routine sf-routine--unavailable">
      <Sparkles />
      <h1>
        {locale === "ar" ? "تجربة الروتين قيد الإعداد" : "The routine experience is being prepared"}
      </h1>
      <p>{apiErrorMessage(error)}</p>
      <Button asChild>
        <Link to="/shop">{locale === "ar" ? "تصفحي المجموعة" : "Explore the collection"}</Link>
      </Button>
    </main>
  );
}

export function visibleRoutineQuestions(questions: RoutinePublicQuestion[], answers: Answers) {
  const ordered = questions
    .filter((question) => question.enabled)
    .sort((a, b) => a.order - b.order || a.key.localeCompare(b.key));
  const visible = new Set<string>();
  for (const question of ordered) {
    const dependenciesVisible =
      !question.visibility ||
      question.visibility.conditions.every((condition) => visible.has(condition.questionKey));
    if (dependenciesVisible && groupMatches(question.visibility, answers))
      visible.add(question.key);
  }
  return ordered.filter((question) => visible.has(question.key));
}
function groupMatches(group: RoutinePublicQuestion["visibility"], answers: Answers) {
  if (!group || !group.conditions.length) return true;
  const results = group.conditions.map((condition) =>
    conditionMatches(answers[condition.questionKey], condition.operator, condition.value),
  );
  return group.mode === "ALL" ? results.every(Boolean) : results.some(Boolean);
}
function conditionMatches(
  actual: Answers[string] | undefined,
  operator: string,
  expected: string | number | boolean | string[],
) {
  const actualList = Array.isArray(actual) ? actual : [actual];
  const expectedList = Array.isArray(expected) ? expected : [expected];
  const eq = (left: unknown, right: unknown) => String(left) === String(right);
  if (operator === "EQUALS") return eq(actual, expected);
  if (operator === "NOT_EQUALS") return !eq(actual, expected);
  if (operator === "CONTAINS") return actualList.some((item) => eq(item, expected));
  if (operator === "CONTAINS_ANY")
    return expectedList.some((item) => actualList.some((value) => eq(value, item)));
  if (operator === "CONTAINS_ALL")
    return expectedList.every((item) => actualList.some((value) => eq(value, item)));
  if (operator === "GREATER_THAN") return Number(actual) > Number(expected);
  if (operator === "LESS_THAN") return Number(actual) < Number(expected);
  return false;
}
function answerComplete(question: RoutinePublicQuestion, value: Answers[string] | undefined) {
  if (!question.required) return true;
  if (Array.isArray(value)) return value.length >= question.minSelections;
  return value !== undefined && value !== "";
}
function moveRank(items: string[], index: number, delta: -1 | 1) {
  const next = [...items];
  const target = index + delta;
  const current = next[index];
  const destination = next[target];
  if (current === undefined || destination === undefined) return next;
  next[index] = destination;
  next[target] = current;
  return next;
}
function selectedTotal(result: RoutineResult, selected: Set<string>) {
  return [...result.morningSteps, ...result.eveningSteps]
    .filter((step) => selected.has(step.id))
    .reduce((sum, step) => sum + step.product.price, 0);
}
function formatMoney(value: number, locale: "en" | "ar") {
  return new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 2,
  }).format(value / 100);
}
