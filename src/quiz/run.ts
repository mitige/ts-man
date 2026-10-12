import { createInterface } from "node:readline/promises";
import { questionsFor } from "../catalog/catalog";
import { renderQuestion } from "../cli/render";
import { addAnswer, type Score } from "../quiz/score";
import type { Question } from "../types";

/** the explanation printed after an answer, with the right choice in words. */
export function feedbackLine(question: Question, choice: number): string {
  const right = choice === question.answer;
  const verdict = right ? "bonne réponse" : `faux, la bonne réponse était ${question.answer}`;
  return `${verdict}. ${question.explanation}`;
}

/** reads one line from the user and returns it, or undefined when stdin is closed. */
async function ask(prompt: string): Promise<string | undefined> {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  try {
    return await rl.question(prompt);
  } catch {
    return undefined;
  } finally {
    rl.close();
  }
}

/** asks one question, reprompts until a valid choice is typed, and returns the updated score. */
async function playOne(question: Question, index: number, total: number, score: Score): Promise<Score> {
  console.log(renderQuestion(question, index, total));
  for (;;) {
    const raw = await ask("ton choix : ");
    if (raw === undefined) return score;
    const choice = Number.parseInt(raw, 10);
    if (Number.isInteger(choice) && choice >= 1 && choice <= question.choices.length) {
      console.log(feedbackLine(question, choice));
      console.log("");
      return addAnswer(score, question, choice);
    }
    console.log(`tape un nombre entre 1 et ${question.choices.length}.`);
  }
}

/** runs the whole quiz for one topic id and returns the final score, or undefined when there are no questions. */
export async function runQuiz(topicId: string): Promise<Score | undefined> {
  const questions = questionsFor(topicId);
  if (questions.length === 0) return undefined;
  let score: Score = { asked: 0, correct: 0 };
  for (const [i, question] of questions.entries()) {
    score = await playOne(question, i + 1, questions.length, score);
  }
  return score;
}
