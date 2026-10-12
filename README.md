# ts-man

documentation typescript interactive dans le terminal, pour apprendre typescript à côté des cours.

copie typescript de [rust-man](https://github.com/mitige/rust-man) : mêmes idées, contenu typescript.

## installation

linux et macos :

```sh
curl -fsSL https://raw.githubusercontent.com/mitige/ts-man/main/install.sh | sh
```

windows (powershell) :

```powershell
irm https://raw.githubusercontent.com/mitige/ts-man/main/install.ps1 | iex
```

un binaire autonome est fourni pour chaque plateforme dans les releases : linux (x64, arm64, musl), macos (x64, arm64), windows (x64). aucune dépendance à installer.

## usage

```sh
ts-man list               # liste les fiches par catégorie
ts-man show generiques    # affiche une fiche
ts-man search union       # cherche dans les fiches
ts-man quiz enums-const   # quiz sur une fiche
ts-man help               # aide
```

## développement

il faut [bun](https://bun.sh) (>= 1.1).

```sh
bun install
bun run start -- list     # lance la cli depuis les sources
bun test                  # tests
bun run typecheck         # vérification des types
bun run build             # binaires release dans dist/
```

## structure

- `src/data/` : les fiches et les questions du quiz, en données typées
- `src/catalog/` : recherche et filtrage des fiches
- `src/quiz/` : score et boucle de quiz interactive
- `src/cli/` : arguments, rendu texte et commandes
- `tests/` : tests unitaires
- `scripts/build-binaries.ts` : compilation croisée des binaires

## licence

mit, voir `LICENSE`.
