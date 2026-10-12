import { findTopic } from "../catalog/catalog";
import { renderList, renderSearch, renderTopic } from "../cli/render";
import { percent, type Score } from "../quiz/score";

/** the outcome of one command: text to print and the exit code to finish with. */
export interface Outcome {
  output: string;
  code: number;
}

/** the version printed by `ts-man version`; kept in step with package.json. */
export const version = "1.0.0";

/** runs `ts-man show <id>` and returns the page, or a clear message when the id is unknown. */
export function runShow(id: string | undefined): Outcome {
  const topic = id === undefined ? undefined : findTopic(id);
  if (topic === undefined) {
    return { output: `fiche introuvable : ${id ?? "(aucun id)"}`, code: 1 };
  }
  return { output: renderTopic(topic), code: 0 };
}

/** runs `ts-man search <terme>` and returns the matching topics, or a usage hint with no term. */
export function runSearch(term: string | undefined): Outcome {
  if (term === undefined || term.trim() === "") {
    return { output: "usage : ts-man search <terme>", code: 1 };
  }
  return { output: renderSearch(term), code: 0 };
}

/** runs `ts-man list` and returns the catalog grouped by category. */
export function runList(): Outcome {
  return { output: renderList(), code: 0 };
}

/** formats the final score line shown when a quiz is over. */
export function scoreLine(score: Score): string {
  return `score : ${score.correct}/${score.asked} (${percent(score)}%)`;
}
