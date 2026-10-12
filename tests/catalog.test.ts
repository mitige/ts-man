import { describe, expect, test } from "bun:test";
import { findTopic, searchTopics, topicsIn } from "../src/catalog/catalog";
import { topics } from "../src/data/topics";
import { questions } from "../src/data/questions";
import { parseArgs } from "../src/cli/args";
import { addAnswer, percent } from "../src/quiz/score";

describe("catalog", () => {
  test("every topic id is unique", () => {
    const ids = topics.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test("every question points to an existing topic", () => {
    for (const q of questions) {
      expect(findTopic(q.topic)).toBeDefined();
    }
  });

  test("every question answer is a valid 1-based index", () => {
    for (const q of questions) {
      expect(q.answer).toBeGreaterThanOrEqual(1);
      expect(q.answer).toBeLessThanOrEqual(q.choices.length);
    }
  });

  test("search is case-insensitive and matches tags", () => {
    const hits = searchTopics("GENERIQUE");
    expect(hits.map((t) => t.id)).toContain("generiques");
  });

  test("an empty search returns nothing", () => {
    expect(searchTopics("   ")).toEqual([]);
  });

  test("topicsIn keeps the catalog order", () => {
    const bases = topicsIn("bases").map((t) => t.id);
    expect(bases[0]).toBe("bienvenue");
  });
});

describe("args", () => {
  test("no argument falls back to help", () => {
    expect(parseArgs([])).toEqual({ command: "help", args: [] });
  });

  test("the command is lowercased and the rest are arguments", () => {
    expect(parseArgs(["SHOW", "generiques"])).toEqual({ command: "show", args: ["generiques"] });
  });
});

describe("score", () => {
  const q = questions[0]!;

  test("a right answer adds one to correct and asked", () => {
    const s = addAnswer({ asked: 0, correct: 0 }, q, q.answer);
    expect(s).toEqual({ asked: 1, correct: 1 });
  });

  test("a wrong answer adds only to asked", () => {
    const wrong = q.answer === 1 ? 2 : 1;
    expect(addAnswer({ asked: 0, correct: 0 }, q, wrong)).toEqual({ asked: 1, correct: 0 });
  });

  test("percent is 0 with no question and rounds otherwise", () => {
    expect(percent({ asked: 0, correct: 0 })).toBe(0);
    expect(percent({ asked: 3, correct: 2 })).toBe(67);
  });
});
