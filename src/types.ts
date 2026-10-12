/** the categories a topic can belong to, shown as section names in `ts-man list`. */
export type Category = "bases" | "types" | "fonctions" | "objets" | "avance" | "outillage";

/** one documentation entry: a short course page the user reads with `ts-man show`. */
export interface Topic {
  id: string;
  title: string;
  category: Category;
  difficulty: 1 | 2 | 3 | 4 | 5;
  tags: string[];
  synopsis: string;
  description: string;
  example: string;
}

/** one quiz question tied to a topic; `answer` is the 1-based index of the right choice. */
export interface Question {
  id: string;
  topic: string;
  prompt: string;
  choices: string[];
  answer: number;
  explanation: string;
}
