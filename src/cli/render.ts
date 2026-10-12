import { categories, searchTopics, topicsIn } from "../catalog/catalog";
import type { Question, Topic } from "../types";

/** the usage text printed by `ts-man help`, all in lowercase. */
export const usage = `ts-man — documentation typescript dans le terminal

usage :
  ts-man list               liste les fiches par catégorie
  ts-man show <id>          affiche une fiche
  ts-man search <terme>     cherche dans les fiches
  ts-man quiz <id>          quiz sur une fiche
  ts-man version            affiche la version
  ts-man help               affiche cette aide`;

/** renders one topic as a block of plain lines, ready to print. */
export function renderTopic(topic: Topic): string {
  return [
    `${topic.title}  [${topic.id}]`,
    `difficulté ${topic.difficulty}/5 · ${topic.category}`,
    "",
    topic.synopsis,
    "",
    topic.description,
    "",
    "exemple :",
    topic.example,
  ].join("\n");
}

/** renders the topics grouped under their category headings. */
export function renderList(): string {
  return categories
    .map((category) => {
      const rows = topicsIn(category).map((t) => `  ${t.id.padEnd(24)} ${t.title}`);
      return [category, ...rows].join("\n");
    })
    .join("\n\n");
}

/** renders the search hits, or a short notice when nothing matches. */
export function renderSearch(term: string): string {
  const hits = searchTopics(term);
  if (hits.length === 0) return `aucune fiche pour « ${term} ».`;
  return hits.map((t) => `${t.id.padEnd(24)} ${t.title}`).join("\n");
}

/** renders one quiz question with its numbered choices, without the answer. */
export function renderQuestion(question: Question, index: number, total: number): string {
  const choices = question.choices.map((c, i) => `  ${i + 1}. ${c}`).join("\n");
  return `question ${index}/${total} : ${question.prompt}\n${choices}`;
}
