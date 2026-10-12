import type { Topic } from "../types";

/** the course pages shipped with ts-man, in the order they are listed. */
export const topics: Topic[] = [
  {
    id: "bienvenue",
    title: "bienvenue dans ts-man",
    category: "bases",
    difficulty: 1,
    tags: ["intro", "typescript", "javascript"],
    synopsis: "typescript = javascript + un système de types vérifié à la compilation",
    description: `## en une phrase

typescript ajoute des types statiques à javascript. le code tourne en javascript
à l'exécution, mais le compilateur \`tsc\` repère les erreurs de types avant.

## ce que ts-man couvre

- les types de base, les annotations et l'inférence
- les unions, les interfaces, les génériques
- les fonctions typées, les enums, les utility types
- async, promises, modules et tsconfig`,
    example: `const nom: string = "ada";
const age: number = 36;
// const erreur: number = "trente-six"; // erreur de compilation`,
  },
  {
    id: "types-primitifs",
    title: "types primitifs",
    category: "bases",
    difficulty: 1,
    tags: ["string", "number", "boolean", "null", "undefined"],
    synopsis: "string, number, boolean, bigint, symbol, null, undefined",
    description: `## les primitives

- \`string\` : du texte
- \`number\` : tous les nombres, entiers ou flottants
- \`boolean\` : \`true\` ou \`false\`
- \`bigint\` : entiers de taille arbitraire, notés \`10n\`
- \`symbol\` : identifiants uniques
- \`null\` et \`undefined\` : absence de valeur

## piège

avec \`strict\` activé, \`null\` n'appartient pas à \`string\`. il faut un type
union explicite comme \`string | null\`.`,
    example: `let ville: string | null = null;
ville = "paris";
const total: bigint = 10n ** 20n;`,
  },
  {
    id: "annotations-inference",
    title: "annotations et inférence",
    category: "bases",
    difficulty: 2,
    tags: ["inference", "annotation", "const", "let"],
    synopsis: "on annote les paramètres, on laisse l'inférence faire le reste",
    description: `## l'idée

typescript devine le type d'une variable à partir de sa valeur initiale.
on n'écrit donc une annotation que là où la devinette ne suffit pas :
paramètres de fonction, valeur qu'on déclare sans l'initialiser, retour public.

## règle pratique

- \`const\` garde un type littéral, \`let\` élargit au type de base
- annoter les frontières (fonctions exportées), pas chaque variable`,
    example: `const a = 3;          // type: 3
let b = 3;           // type: number
function double(x: number) {
  return x * 2;     // retour inféré : number
}`,
  },
  {
    id: "tableaux-tuples",
    title: "tableaux et tuples",
    category: "types",
    difficulty: 2,
    tags: ["array", "tuple", "readonly"],
    synopsis: "number[] pour une liste, [string, number] pour une paire ordonnée",
    description: `## tableaux

\`number[]\` ou \`Array<number>\` : une liste de taille variable.

## tuples

\`[string, number]\` : taille fixe, chaque position a son type.
utile pour renvoyer plusieurs valeurs nommées par leur position.

## readonly

\`readonly string[]\` interdit les mutations (push, pop, affectation par index).`,
    example: `const notes: number[] = [12, 15, 9];
const point: [number, number] = [3, 4];
const lecture: readonly string[] = ["a", "b"];`,
  },
  {
    id: "interfaces-types",
    title: "interfaces et alias de type",
    category: "objets",
    difficulty: 2,
    tags: ["interface", "type", "objet", "extends"],
    synopsis: "décrire la forme d'un objet avec interface ou type",
    description: `## interface

décrit la forme d'un objet. peut être étendue avec \`extends\` et fusionnée
par déclaration.

## type

alias libre : peut décrire une union, un tuple, une fonction ou un objet.

## quand choisir

- objet public, extensible : \`interface\`
- union, tuple, alias de composition : \`type\``,
    example: `interface Utilisateur {
  id: number;
  nom: string;
  email?: string; // optionnel
}

type Identifiant = number | string;`,
  },
  {
    id: "unions-narrowing",
    title: "unions et narrowing",
    category: "types",
    difficulty: 3,
    tags: ["union", "narrowing", "typeof", "discriminant"],
    synopsis: "string | number, puis réduire le type par des tests à l'exécution",
    description: `## union

\`string | number\` : la valeur est l'un ou l'autre.

## narrowing

un test (\`typeof\`, \`instanceof\`, \`in\`, égalité) réduit le type dans le bloc
qui suit. c'est ce qui permet d'utiliser la valeur sans cast.

## discriminant

un champ commun portant un littéral (\`kind: "cercle"\`) permet un \`switch\`
exhaustif. \`never\` dans le cas par défaut prouve que tous les cas sont couverts.`,
    example: `type Forme =
  | { kind: "cercle"; rayon: number }
  | { kind: "carre"; cote: number };

function aire(f: Forme): number {
  switch (f.kind) {
    case "cercle": return Math.PI * f.rayon ** 2;
    case "carre": return f.cote ** 2;
  }
}`,
  },
  {
    id: "fonctions-typees",
    title: "fonctions typées",
    category: "fonctions",
    difficulty: 2,
    tags: ["fonction", "parametres", "retour", "void", "optionnel"],
    synopsis: "types des paramètres, du retour, paramètres optionnels et par défaut",
    description: `## signature

chaque paramètre a un type, le retour peut être annoté. \`void\` signifie
« ne renvoie pas de valeur utile ».

## options

- \`x?: number\` : paramètre optionnel, de type \`number | undefined\`
- \`x = 1\` : valeur par défaut, le type est inféré
- \`...rest: number[]\` : paramètres restants

## fonctions fléchées

même typage, la syntaxe est \`(a: number) => number\`.`,
    example: `function saluer(nom: string, ponctuation?: string): string {
  return \`bonjour \${nom}\${ponctuation ?? "."}\`;
}

const carre = (n: number): number => n * n;`,
  },
  {
    id: "generiques",
    title: "génériques",
    category: "avance",
    difficulty: 4,
    tags: ["generique", "T", "contrainte", "extends"],
    synopsis: "écrire une fonction ou un type qui marche pour plusieurs types",
    description: `## idée

un générique est un paramètre de type : \`<T>\` est choisi à l'appel.

## contraintes

\`<T extends { id: number }>\` limite \`T\` aux types qui ont un champ \`id\`.

## valeur par défaut

\`<T = string>\` sert quand l'appelant ne précise rien.

on évite les génériques quand un type simple suffit : un générique inutile
rend le code plus dur à lire.`,
    example: `function premier<T>(liste: T[]): T | undefined {
  return liste[0];
}

function ajouterId<T extends object>(o: T): T & { id: number } {
  return { ...o, id: 1 };
}`,
  },
  {
    id: "enums-const",
    title: "enums et objets constants",
    category: "types",
    difficulty: 3,
    tags: ["enum", "as const", "literal", "union"],
    synopsis: "figer un ensemble de valeurs : enum ou objet as const",
    description: `## enum

\`enum\` crée un type et des valeurs au runtime. les \`const enum\` sont
effacés à la compilation, mais posent des problèmes avec certains outils.

## alternative conseillée

un objet \`as const\` plus une union dérivée donne le même résultat sans code
émis supplémentaire.

\`typeof couleurs[keyof typeof couleurs]\` extrait l'union des valeurs.`,
    example: `const couleurs = { rouge: "rouge", vert: "vert" } as const;
type Couleur = (typeof couleurs)[keyof typeof couleurs];
// "rouge" | "vert"`,
  },
  {
    id: "utility-types",
    title: "utility types",
    category: "avance",
    difficulty: 4,
    tags: ["partial", "required", "pick", "omit", "record", "readonly"],
    synopsis: "partial, pick, omit, record : transformer un type existant",
    description: `## les essentiels

- \`Partial<T>\` : tous les champs deviennent optionnels
- \`Required<T>\` : tous les champs deviennent obligatoires
- \`Pick<T, K>\` : garde seulement les clés \`K\`
- \`Omit<T, K>\` : retire les clés \`K\`
- \`Record<K, V>\` : objet dont les clés sont \`K\` et les valeurs \`V\`
- \`Readonly<T>\` : rend tous les champs en lecture seule

## conseil

les utility types évitent de recopier une interface pour une variante.
on les compose : \`Partial<Pick<T, "nom">>\`.`,
    example: `interface Produit { id: number; nom: string; prix: number }
type Brouillon = Partial<Produit>;
type Vitrine = Omit<Produit, "prix">;`,
  },
  {
    id: "async-promises",
    title: "async, promises et types",
    category: "avance",
    difficulty: 3,
    tags: ["async", "await", "promise", "asynchrone"],
    synopsis: "une promise décrit une valeur qui arrivera plus tard",
    description: `## promise

\`Promise<number>\` : une valeur numérique qui sera résolue plus tard.
une fonction \`async\` renvoie toujours une promise, même si le retour écrit
n'en est pas une.

## await

\`await\` extrait la valeur. le type de \`await p\` est celui de la promise
\`p\`, déplié une fois.

## erreurs

le type de \`catch (e)\` est \`unknown\` en mode strict : il faut le réduire
avant de lire \`e.message\`.`,
    example: `async function charger(url: string): Promise<string> {
  const reponse = await fetch(url);
  return reponse.text();
}`,
  },
  {
    id: "null-safety",
    title: "null et undefined en mode strict",
    category: "bases",
    difficulty: 3,
    tags: ["strict", "null", "undefined", "optional chaining", "nullish"],
    synopsis: "strictNullChecks force à traiter l'absence de valeur",
    description: `## le mode strict

avec \`"strict": true\` dans tsconfig, \`null\` et \`undefined\` ne passent plus
partout. chaque accès doit être protégé.

## outils

- \`?.\` : accès seulement si la valeur existe
- \`??\` : valeur de repli si la valeur est \`null\` ou \`undefined\`
- un test explicite \`if (x)\` réduit le type

## piège

\`??\` ne traite que \`null\` et \`undefined\`. \`||\` traite aussi \`0\` et \`""\`.`,
    example: `function ville(p: { adresse?: { ville: string } }): string {
  return p.adresse?.ville ?? "inconnue";
}`,
  },
  {
    id: "modules-tsconfig",
    title: "modules et tsconfig",
    category: "outillage",
    difficulty: 2,
    tags: ["module", "import", "export", "tsconfig", "strict"],
    synopsis: "organiser le code en modules et configurer le compilateur",
    description: `## modules

chaque fichier avec un \`import\` ou \`export\` est un module. on exporte
explicitement ce qui doit être visible de l'extérieur.

## tsconfig.json

- \`strict\` : active toutes les vérifications strictes
- \`noUncheckedIndexedAccess\` : \`tab[0]\` peut valoir \`undefined\`
- \`moduleResolution\` : comment trouver les imports

## commandes utiles

- \`tsc --noEmit\` : vérifie les types sans produire de fichiers
- \`tsc --watch\` : revérifie à chaque sauvegarde`,
    example: `// utils.ts
export function somme(a: number, b: number): number {
  return a + b;
}

// main.ts
import { somme } from "./utils";`,
  },
];
