import type { Question } from "../types";

/** true when the chosen 1-based index is the right answer of the question. */
export function isCorrect(question: Question, choice: number): boolean {
  return choice === question.answer;
}

/** the result of a quiz run: how many questions were asked and how many were right. */
export interface Score {
  asked: number;
  correct: number;
}

/** adds one answer to a score and hands back a new score, leaving the old one untouched. */
export function addAnswer(score: Score, question: Question, choice: number): Score {
  return {
    asked: score.asked + 1,
    correct: score.correct + (isCorrect(question, choice) ? 1 : 0),
  };
}

/** the percentage of right answers, rounded, or 0 when nothing was asked. */
export function percent(score: Score): number {
  if (score.asked === 0) return 0;
  return Math.round((score.correct / score.asked) * 100);
}
