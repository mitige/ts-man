import type { Category, Question, Topic } from "../types";
import { topics } from "../data/topics";
import { questions } from "../data/questions";

/** the ordered list of categories, used to group the `list` output. */
export const categories: Category[] = ["bases", "types", "fonctions", "objets", "avance", "outillage"];

/** finds a topic by its id, or undefined when no page has that id. */
export function findTopic(id: string): Topic | undefined {
  return topics.find((t) => t.id === id);
}

/** returns the topics of one category, keeping the catalog order. */
export function topicsIn(category: Category): Topic[] {
  return topics.filter((t) => t.category === category);
}

/** returns the topics whose title, synopsis or tags contain the term, case-insensitively. */
export function searchTopics(term: string): Topic[] {
  const needle = term.trim().toLowerCase();
  if (needle === "") return [];
  return topics.filter((t) => {
    const haystack = [t.title, t.synopsis, ...t.tags].join(" ").toLowerCase();
    return haystack.includes(needle);
  });
}

/** returns the quiz questions attached to one topic id. */
export function questionsFor(topicId: string): Question[] {
  return questions.filter((q) => q.topic === topicId);
}
