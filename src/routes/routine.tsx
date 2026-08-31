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
import { ProductCard } from "@/components/shop/ProductCard";
import type { Product } from "@/lib/products";
import {
  apiErrorMessage,
  addRoutineSelectionToCart,
  evaluateRoutine,
  getRoutineBuilder,
  recordRoutineEvent,
  startRoutineSession,
  type RoutinePublicConfig,
  type RoutinePublicQuestion,
  type RoutineOwnedStep,
  type RoutineRecommendationStep,
  type RoutineResult,
} from "@/lib/api";
import { createSeoHead } from "@/lib/seo";
import { useStore } from "@/lib/store";
import "@/styles/routine-builder.css";

type Answers = Record<string, string | number | boolean | string[]>;

export const Route = createFileRoute("/routine")({
  validateSearch: (raw: Record<string, unknown>) => ({
    ...(raw["lang"] === "ar" ? { lang: "ar" as const } : {}),
    ...(typeof raw["anchorProductId"] === "string" && raw["anchorProductId"]
      ? { anchorProductId: raw["anchorProductId"] }
      : {}),
    ...(typeof raw["anchorVariantId"] === "string" && raw["anchorVariantId"]
      ? { anchorVariantId: raw["anchorVariantId"] }
      : {}),
    ...(raw["owned"] === "1" ? { owned: "1" as const } : {}),
  }),
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
  const search = Route.useSearch();
  const mode = search.anchorProductId ? "CONTEXTUAL" : "FULL";
  const query = useQuery({
    queryKey: ["routine-builder", "published", mode],
    queryFn: () => getRoutineBuilder(mode),
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
  return (
    <RoutineExperience
      snapshot={query.data}
      anchorIdentity={
        search.anchorProductId
          ? {
              productId: search.anchorProductId,
              ...(search.anchorVariantId ? { variantId: search.anchorVariantId } : {}),
              alreadyOwned: search.owned === "1",
            }
          : null
      }
    />
  );
}

function RoutineExperience({
  snapshot,
  anchorIdentity,
}: {
  snapshot: RoutinePublicConfig;
  anchorIdentity: { productId: string; variantId?: string; alreadyOwned: boolean } | null;
}) {
  const { locale, acceptCart, setCartOpen } = useStore();
  const ar = locale === "ar";
  const mode = anchorIdentity ? "CONTEXTUAL" : "FULL";
  const [phase, setPhase] = useState<"intro" | "profile" | "questions" | "result">("intro");
  const [sessionId, setSessionId] = useState<string | undefined>();
  const [sessionSnapshot, setSessionSnapshot] = useState<RoutinePublicConfig | null>(null);
  const [anchorOwned, setAnchorOwned] = useState(anchorIdentity?.alreadyOwned ?? false);
  const [answers, setAnswers] = useState<Answers>({});
  const [profileQuestionKeys, setProfileQuestionKeys] = useState<Set<string> | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [result, setResult] = useState<RoutineResult | null>(null);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [selectedSteps, setSelectedSteps] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);
  const activeSnapshot = sessionSnapshot ?? snapshot;
  const config = activeSnapshot.config;
  const visible = useMemo(
    () => visibleRoutineQuestions(config.questions, answers),
    [answers, config.questions],
  );
  const journeyQuestions = useMemo(
    () =>
      profileQuestionKeys ? visible.filter((item) => profileQuestionKeys.has(item.key)) : visible,
    [profileQuestionKeys, visible],
  );
  const question =
    journeyQuestions[Math.min(questionIndex, Math.max(0, journeyQuestions.length - 1))];
  const text = (value: { en: string; ar: string }) => value[locale];

  useEffect(() => {
    const visibleKeys = new Set(visible.map((item) => item.key));
    setAnswers((current) => {
      const cleaned = Object.fromEntries(
        Object.entries(current).filter(([key]) => visibleKeys.has(key)),
      );
      return Object.keys(cleaned).length === Object.keys(current).length ? current : cleaned;
    });
    setQuestionIndex((current) => Math.min(current, Math.max(0, journeyQuestions.length - 1)));
  }, [journeyQuestions.length, visible]);

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
      const session = await startRoutineSession(
        locale,
        mode,
        anchorIdentity ? { ...anchorIdentity, alreadyOwned: anchorOwned } : null,
      );
      setSessionId(session.sessionId);
      setSessionSnapshot(session);
      if (mode === "CONTEXTUAL" && session.sessionId) {
        void recordRoutineEvent(session.sessionId, {
          type: "COMPLETE_ROUTINE_CTA_CLICKED",
          ...(session.anchor?.productId ? { productId: session.anchor.productId } : {}),
        }).catch(() => undefined);
      }
      if (session.profileAvailable && session.suggestedAnswers) setPhase("profile");
      else if (session.config.questions.length) {
        setProfileQuestionKeys(null);
        setPhase("questions");
      } else await generate({}, session.sessionId, {});
    } catch (error) {
      toast.error(apiErrorMessage(error, locale));
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
    if (questionIndex < journeyQuestions.length - 1) {
      setQuestionIndex((value) => value + 1);
      return;
    }
    await generate();
  };

  const generate = async (
    variants = selectedVariants,
    activeSessionId = sessionId,
    activeAnswers = answers,
  ) => {
    setBusy(true);
    try {
      const next = await evaluateRoutine({
        ...(activeSessionId ? { sessionId: activeSessionId } : {}),
        answers: activeAnswers,
        locale,
        mode,
        anchor: anchorIdentity ? { ...anchorIdentity, alreadyOwned: anchorOwned } : null,
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
        new Set(
          [...next.morningSteps, ...next.eveningSteps]
            .filter((step) => !step.alreadyOwned && step.product.stock > 0)
            .map((step) => step.id),
        ),
      );
      setPhase("result");
    } catch (error) {
      toast.error(apiErrorMessage(error, locale));
    } finally {
      setBusy(false);
    }
  };

  const applySavedProfile = async () => {
    const suggested = sessionSnapshot?.suggestedAnswers ?? {};
    setAnswers(suggested);
    const missing = visibleRoutineQuestions(config.questions, suggested).filter(
      (item) => item.required && !answerComplete(item, suggested[item.key]),
    );
    if (missing.length) {
      setProfileQuestionKeys(new Set(missing.map((item) => item.key)));
      setQuestionIndex(0);
      setPhase("questions");
    } else await generate({}, sessionId, suggested);
  };

  const swap = async (step: RoutineRecommendationStep, variantId: string) => {
    const next = { ...selectedVariants, [step.id]: variantId };
    setSelectedVariants(next);
    if (sessionId)
      void recordRoutineEvent(sessionId, {
        type: "ROUTINE_ALTERNATIVE_SELECTED",
        productId: step.product.productId,
      }).catch(() => undefined);
    await generate(next);
  };

  const addSelected = async () => {
    if (!result || !sessionId || busy) return;
    setBusy(true);
    try {
      const selections = [...result.morningSteps, ...result.eveningSteps]
        .filter((step) => selectedSteps.has(step.id) && !step.alreadyOwned)
        .map((step) => ({ stepId: step.id, variantId: step.product.variantId }));
      const response = await addRoutineSelectionToCart(sessionId, selections);
      acceptCart(response.cart);
      setResult(response.routine);
      toast.success(
        ar
          ? `تمت إضافة ${response.addedVariantIds.length} منتجات إلى الحقيبة.`
          : `${response.addedVariantIds.length} products added to your bag.`,
      );
      setCartOpen(true);
    } catch (error) {
      toast.error(apiErrorMessage(error, locale));
    } finally {
      setBusy(false);
    }
  };

  const addOne = async (step: RoutineRecommendationStep) => {
    if (busy || !sessionId || step.alreadyOwned) return;
    setBusy(true);
    try {
      const response = await addRoutineSelectionToCart(sessionId, [
        { stepId: step.id, variantId: step.product.variantId },
      ]);
      acceptCart(response.cart);
      setResult(response.routine);
      setCartOpen(true);
    } catch (error) {
      toast.error(apiErrorMessage(error, locale));
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
              {mode === "CONTEXTUAL"
                ? ar
                  ? "أكملي روتينك"
                  : "Complete your routine"
                : ar
                  ? "إرشادات BioReza المخصصة"
                  : "BioReza personal guidance"}
            </p>
            <h1>
              {mode === "CONTEXTUAL" && config.contextualCompletion
                ? text(config.contextualCompletion.title)
                : text(config.title)}
            </h1>
            <p>
              {mode === "CONTEXTUAL" && config.contextualCompletion
                ? text(config.contextualCompletion.introduction)
                : text(config.introduction)}
            </p>
            {mode === "CONTEXTUAL" ? (
              <label className="sf-routine-anchor-owned">
                <input
                  type="checkbox"
                  checked={anchorOwned}
                  onChange={(event) => setAnchorOwned(event.target.checked)}
                />
                <span>
                  <strong>{ar ? "لدي هذا المنتج بالفعل" : "I already own this product"}</strong>
                  <small>
                    {ar
                      ? "لن يُحتسب سعره ضمن ميزانية التسوق ولن يُضف للحقيبة."
                      : "Its price will not count toward the shopping budget or bag."}
                  </small>
                </span>
              </label>
            ) : null}
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

      {phase === "profile" && sessionSnapshot ? (
        <section className="sf-routine-profile-reuse">
          <p className="sf-routine-eyebrow">{ar ? "ملفك المحفوظ" : "Your saved profile"}</p>
          <h1>{ar ? "هل نستخدم ملف العناية المحفوظ؟" : "Use your saved beauty profile?"}</h1>
          {sessionSnapshot.anchor ? (
            <div className="sf-routine-anchor-summary">
              {sessionSnapshot.anchor.imageUrl ? (
                <img src={sessionSnapshot.anchor.imageUrl} alt="" />
              ) : null}
              <span>
                <small>{ar ? "نقطة بداية الروتين" : "Routine starting point"}</small>
                <strong>{sessionSnapshot.anchor.name}</strong>
              </span>
            </div>
          ) : null}
          <p className="sf-routine-profile-signals">
            {profileAnswerSummary(
              config.questions,
              sessionSnapshot.suggestedAnswers ?? {},
              locale,
            ).join(" · ")}
          </p>
          <div>
            <Button size="lg" onClick={() => void applySavedProfile()} loading={busy}>
              {ar ? "استخدمي الملف" : "Use profile"}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                setAnswers(sessionSnapshot.suggestedAnswers ?? {});
                setProfileQuestionKeys(null);
                setQuestionIndex(0);
                setPhase("questions");
              }}
            >
              {ar ? "تعديل الإجابات" : "Adjust"}
            </Button>
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
              <div aria-live="polite">
                <span>{ar ? "الملف" : "Profile"}</span>
                <b>
                  {questionIndex + 1} / {journeyQuestions.length}
                </b>
              </div>
              <progress
                aria-label={ar ? "تقدم أسئلة الروتين" : "Routine question progress"}
                value={questionIndex + 1}
                max={journeyQuestions.length}
              />
            </div>
            <span className="sf-routine-version">v{activeSnapshot.version}</span>
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
                {questionIndex === journeyQuestions.length - 1
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
          onAlternativeOpen={(step) => {
            if (!sessionId) return;
            void recordRoutineEvent(sessionId, {
              type: "ROUTINE_ALTERNATIVE_OPENED",
              productId: step.product.productId,
            }).catch(() => undefined);
          }}
          onAdd={addSelected}
          onAddOne={addOne}
          onRestart={() => {
            setAnswers({});
            setResult(null);
            setSessionId(undefined);
            setSessionSnapshot(null);
            setProfileQuestionKeys(null);
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
                    aria-label={locale === "ar" ? "تحريك لأعلى" : "Move up"}
                    disabled={rank === 0}
                    onClick={() => onChange(moveRank(selected, rank, -1))}
                  >
                    <ChevronUp />
                  </button>
                  <button
                    type="button"
                    aria-label={locale === "ar" ? "تحريك لأسفل" : "Move down"}
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
  onAlternativeOpen,
  onAdd,
  onAddOne,
  onRestart,
}: {
  result: RoutineResult;
  config: RoutinePublicConfig;
  locale: "en" | "ar";
  selected: Set<string>;
  busy: boolean;
  onToggle: (id: string) => void;
  onSwap: (step: RoutineRecommendationStep, variantId: string) => Promise<void>;
  onAlternativeOpen: (step: RoutineRecommendationStep) => void;
  onAdd: () => Promise<void>;
  onAddOne: (step: RoutineRecommendationStep) => Promise<void>;
  onRestart: () => void;
}) {
  const ar = locale === "ar";
  const text = (value: { en: string; ar: string }) => value[locale];
  const sharedStepPairs = result.morningSteps.flatMap((morning) => {
    const evening = result.eveningSteps.find(
      (step) =>
        step.roleKey === morning.roleKey && step.product.variantId === morning.product.variantId,
    );
    return evening ? [[morning.id, evening.id] as const] : [];
  });
  const sharedStepIds = new Set(sharedStepPairs.flat());
  const sharedMate = new Map(
    sharedStepPairs.flatMap(([morning, evening]) => [
      [morning, evening] as const,
      [evening, morning] as const,
    ]),
  );
  const toggleRoutineStep = (id: string) => {
    onToggle(id);
    const mate = sharedMate.get(id);
    if (mate) onToggle(mate);
  };
  return (
    <section className="sf-routine-result">
      <header>
        <div>
          <p className="sf-routine-eyebrow">
            {result.anchor
              ? ar
                ? "روتينك المبني حول اختيارك"
                : "Built around your selected product"
              : ar
                ? "مختار وفقاً لإجاباتك"
                : "Selected from your answers"}
          </p>
          <h1>
            {result.anchor
              ? ar
                ? `روتينك مع ${result.anchor.name}`
                : `Your routine with ${result.anchor.name}`
              : text(config.config.resultTitle)}
          </h1>
          <p>{result.profileSummary.join(" · ")}</p>
          {result.templateIdentity?.name ? (
            <p className="sf-routine-template-name">
              {result.templateIdentity.name} · v{result.templateIdentity.version}
            </p>
          ) : null}
          {result.templateIdentity?.presentation.intro[locale] ? (
            <p>{result.templateIdentity.presentation.intro[locale]}</p>
          ) : null}
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
          {result.warnings.length ? (
            <div className="sf-routine-warnings" role="status">
              {result.warnings.map((warning) => (
                <p key={warning}>{warning}</p>
              ))}
            </div>
          ) : null}
          <div className="sf-routine-result__columns">
            <RoutinePeriod
              title={ar ? "الصباح" : "Morning"}
              icon={Sun}
              steps={result.morningSteps}
              ownedSteps={(result.ownedSteps ?? []).filter((step) => step.period === "AM")}
              locale={locale}
              selected={selected}
              onToggle={toggleRoutineStep}
              onSwap={onSwap}
              onAlternativeOpen={onAlternativeOpen}
              onAddOne={onAddOne}
              sharedStepIds={sharedStepIds}
              anchorAlternatives={result.anchorAlternatives ?? []}
            />
            <RoutinePeriod
              title={ar ? "المساء" : "Evening"}
              icon={Moon}
              steps={result.eveningSteps.filter((step) => !sharedStepIds.has(step.id))}
              ownedSteps={(result.ownedSteps ?? []).filter((step) => step.period === "PM")}
              locale={locale}
              selected={selected}
              onToggle={toggleRoutineStep}
              onSwap={onSwap}
              onAlternativeOpen={onAlternativeOpen}
              onAddOne={onAddOne}
              sharedStepIds={sharedStepIds}
              anchorAlternatives={result.anchorAlternatives ?? []}
            />
          </div>
          <aside className="sf-routine-cart-bar">
            <div>
              <span>
                {ar
                  ? `${selectedProductCount(result, selected)} منتجات محددة`
                  : `${selectedProductCount(result, selected)} products selected`}
              </span>
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
  ownedSteps,
  locale,
  selected,
  onToggle,
  onSwap,
  onAlternativeOpen,
  onAddOne,
  sharedStepIds,
  anchorAlternatives,
}: {
  title: string;
  icon: typeof Sun;
  steps: RoutineRecommendationStep[];
  ownedSteps: RoutineOwnedStep[];
  locale: "en" | "ar";
  selected: Set<string>;
  onToggle: (id: string) => void;
  onSwap: (step: RoutineRecommendationStep, variantId: string) => Promise<void>;
  onAlternativeOpen: (step: RoutineRecommendationStep) => void;
  onAddOne: (step: RoutineRecommendationStep) => Promise<void>;
  sharedStepIds: Set<string>;
  anchorAlternatives: RoutineResult["anchorAlternatives"];
}) {
  return (
    <section className="sf-routine-period">
      <h2>
        <Icon />
        {title}
      </h2>
      <div>
        {ownedSteps.map((step, index) => (
          <article key={step.id} className="sf-routine-owned-step">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <p>{step.roleLabel}</p>
              <strong>
                {locale === "ar"
                  ? "استخدمي المنتج الموجود لديك"
                  : "Use the product you already own"}
              </strong>
            </div>
            <Check aria-hidden="true" />
          </article>
        ))}
        {steps.map((step, index) => (
          <article key={step.id} className="sf-routine-product">
            <label className="sf-routine-select">
              <input
                type="checkbox"
                checked={selected.has(step.id)}
                disabled={step.alreadyOwned || step.product.stock < 1}
                aria-label={
                  locale === "ar"
                    ? `تحديد ${step.product.name} للإضافة إلى الحقيبة`
                    : `Select ${step.product.name} to add to bag`
                }
                onChange={() => onToggle(step.id)}
              />
              <span>{String(index + 1).padStart(2, "0")}</span>
            </label>
            <div className="sf-routine-product__canonical-card">
              <ProductCard product={routineCardProduct(step)} compact />
            </div>
            <div className="sf-routine-product__copy">
              <p>{step.roleLabel}</p>
              {step.isAnchor ? (
                <span className="sf-routine-anchor-badge">
                  {locale === "ar" ? "منتجك المختار" : "Your selected product"}
                </span>
              ) : null}
              {step.alreadyOwned ? (
                <span className="sf-routine-owned-badge">
                  {locale === "ar" ? "لديك بالفعل" : "Already owned"}
                </span>
              ) : null}
              {step.product.stock < 1 ? (
                <span className="sf-routine-unavailable-badge">
                  {locale === "ar" ? "غير متاح حالياً" : "Currently unavailable"}
                </span>
              ) : null}
              {sharedStepIds.has(step.id) ? (
                <span className="sf-routine-shared-period">
                  {locale === "ar" ? "صباحاً + مساءً" : "AM + PM"}
                </span>
              ) : null}
              <small>{step.product.explanation}</small>
              {step.warnings.map((warning) => (
                <em key={warning}>{warning}</em>
              ))}
              {step.alternatives.length ? (
                <details onToggle={(event) => event.currentTarget.open && onAlternativeOpen(step)}>
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
              {step.isAnchor && anchorAlternatives.length ? (
                <details onToggle={(event) => event.currentTarget.open && onAlternativeOpen(step)}>
                  <summary>
                    <ArrowLeftRight />
                    {locale === "ar" ? "بدائل للمنتج المختار" : "Alternatives to this product"}
                  </summary>
                  {anchorAlternatives.map((product) => (
                    <Link
                      key={product.variantId}
                      to="/product/$slug"
                      params={{ slug: product.slug }}
                    >
                      <span>{product.name}</span>
                      <b>{formatMoney(product.price, locale)}</b>
                    </Link>
                  ))}
                </details>
              ) : null}
              {!step.alreadyOwned ? (
                <Button variant="outline" size="sm" onClick={() => void onAddOne(step)}>
                  <ShoppingBag />
                  {locale === "ar" ? "أضيفي هذا المنتج" : "Add this product"}
                </Button>
              ) : null}
            </div>
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
function profileAnswerSummary(
  questions: RoutinePublicQuestion[],
  answers: Answers,
  locale: "en" | "ar",
) {
  return questions.flatMap((question) => {
    const value = answers[question.key];
    const values = Array.isArray(value) ? value : value == null ? [] : [String(value)];
    const labels = values.map(
      (item) =>
        question.answers.find((answer) => answer.key === String(item))?.label[locale] ??
        String(item),
    );
    return labels.filter(Boolean);
  });
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
function routineCardProduct(step: RoutineRecommendationStep): Product {
  const product = step.product;
  return {
    id: product.productId,
    slug: product.slug,
    name: product.name,
    category: step.roleLabel,
    type: step.roleLabel,
    benefit: product.explanation,
    shortDescription: product.explanation,
    description: product.explanation,
    price: product.price / 100,
    ...(product.compareAtPrice != null ? { originalPrice: product.compareAtPrice / 100 } : {}),
    rating: 0,
    reviews: 0,
    image: product.imageUrl ?? "/bioreza-logo.png",
    imageAlt: product.name,
    gallery: [product.imageUrl ?? "/bioreza-logo.png"],
    sizes: [
      {
        id: product.variantId,
        label: product.variantName,
        price: product.price / 100,
        stock: product.stock,
      },
    ],
    stock: product.stock,
    concerns: [],
    skinTypes: [],
    inStock: product.stock > 0,
    ingredients: "",
    ingredientDetails: [],
    howToUse: "",
    details: "",
    benefits: [],
  };
}
function selectedTotal(result: RoutineResult, selected: Set<string>) {
  return [
    ...new Map(
      [...result.morningSteps, ...result.eveningSteps]
        .filter((step) => selected.has(step.id) && !step.alreadyOwned)
        .map((step) => [step.product.variantId, step.product.price]),
    ).values(),
  ].reduce((sum, price) => sum + price, 0);
}
function selectedProductCount(result: RoutineResult, selected: Set<string>) {
  return new Set(
    [...result.morningSteps, ...result.eveningSteps]
      .filter((step) => selected.has(step.id) && !step.alreadyOwned)
      .map((step) => step.product.variantId),
  ).size;
}
function formatMoney(value: number, locale: "en" | "ar") {
  return new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 2,
  }).format(value / 100);
}
