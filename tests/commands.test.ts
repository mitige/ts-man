import { describe, expect, test } from "bun:test";
import { runList, runSearch, runShow, scoreLine } from "../src/cli/commands";
import { renderList, renderTopic, usage } from "../src/cli/render";
import { findTopic } from "../src/catalog/catalog";

describe("commands", () => {
  test("show with a known id returns the page and code 0", () => {
    const out = runShow("generiques");
    expect(out.code).toBe(0);
    expect(out.output).toContain("génériques");
  });

  test("show with an unknown id returns code 1 and a clear message", () => {
    const out = runShow("inconnu");
    expect(out.code).toBe(1);
    expect(out.output).toContain("fiche introuvable : inconnu");
  });

  test("show without an id reports the missing id", () => {
    expect(runShow(undefined).output).toContain("(aucun id)");
  });

  test("search without a term asks for a usage", () => {
    expect(runSearch(undefined).code).toBe(1);
  });

  test("list prints every category heading", () => {
    const out = runList();
    expect(out.code).toBe(0);
    expect(out.output).toContain("bases");
    expect(out.output).toContain("outillage");
  });

  test("score line gives correct over asked and the percent", () => {
    expect(scoreLine({ asked: 4, correct: 3 })).toBe("score : 3/4 (75%)");
  });
});

describe("render", () => {
  test("renderTopic includes the example block", () => {
    const topic = findTopic("unions-narrowing")!;
    expect(renderTopic(topic)).toContain("exemple :");
  });

  test("renderList lists topics under their category", () => {
    expect(renderList()).toContain("types");
  });

  test("usage names every command", () => {
    for (const word of ["list", "show", "search", "quiz", "version", "help"]) {
      expect(usage).toContain(word);
    }
  });
});
