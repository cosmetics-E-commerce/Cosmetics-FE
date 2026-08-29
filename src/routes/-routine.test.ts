import { describe, expect, it } from "vitest";
import type { RoutinePublicQuestion } from "@/lib/api";
import { visibleRoutineQuestions } from "./routine";

const base = (overrides: Partial<RoutinePublicQuestion>): RoutinePublicQuestion => ({
  id: crypto.randomUUID(),
  key: "question",
  type: "SINGLE_CHOICE",
  label: { en: "Question", ar: "سؤال" },
  description: { en: "", ar: "" },
  helpText: { en: "", ar: "" },
  required: true,
  enabled: true,
  order: 0,
  visibility: null,
  answers: [],
  minSelections: 0,
  maxSelections: 1,
  scale: null,
  ...overrides,
});

describe("customer routine conditional journey", () => {
  const questions = [
    base({ id: "10000000-0000-4000-8000-000000000001", key: "skin", order: 0 }),
    base({
      id: "10000000-0000-4000-8000-000000000002",
      key: "sensitivity",
      order: 1,
      visibility: {
        mode: "ALL",
        conditions: [
          {
            id: "20000000-0000-4000-8000-000000000001",
            questionKey: "skin",
            operator: "EQUALS",
            value: "sensitive",
          },
        ],
      },
    }),
    base({
      id: "10000000-0000-4000-8000-000000000003",
      key: "details",
      order: 2,
      visibility: {
        mode: "ALL",
        conditions: [
          {
            id: "20000000-0000-4000-8000-000000000002",
            questionKey: "sensitivity",
            operator: "EQUALS",
            value: "yes",
          },
        ],
      },
    }),
  ];

  it("shows only relevant questions", () => {
    expect(
      visibleRoutineQuestions(questions, { skin: "balanced" }).map((item) => item.key),
    ).toEqual(["skin"]);
    expect(
      visibleRoutineQuestions(questions, { skin: "sensitive" }).map((item) => item.key),
    ).toEqual(["skin", "sensitivity"]);
  });

  it("does not resurrect a nested question from a stale hidden answer", () => {
    expect(
      visibleRoutineQuestions(questions, { skin: "balanced", sensitivity: "yes" }).map(
        (item) => item.key,
      ),
    ).toEqual(["skin"]);
  });

  it("supports ALL and ANY conditional groups deterministically", () => {
    const any = base({
      key: "any",
      order: 3,
      visibility: {
        mode: "ANY",
        conditions: [
          { id: crypto.randomUUID(), questionKey: "skin", operator: "EQUALS", value: "sensitive" },
          { id: crypto.randomUUID(), questionKey: "sensitivity", operator: "EQUALS", value: "yes" },
        ],
      },
    });
    expect(
      visibleRoutineQuestions([...questions, any], { skin: "sensitive", sensitivity: "no" }).map(
        (item) => item.key,
      ),
    ).toContain("any");
  });

  it("preserves configured order with stable-key tie breaking", () => {
    const tied = [base({ key: "z", order: 0 }), base({ key: "a", order: 0 })];
    expect(visibleRoutineQuestions(tied, {}).map((item) => item.key)).toEqual(["a", "z"]);
  });
});
