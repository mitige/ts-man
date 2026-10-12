#!/usr/bin/env bun
import { runList, runSearch, runShow, scoreLine, version } from "./cli/commands";
import { parseArgs } from "./cli/args";
import { usage } from "./cli/render";
import { runQuiz } from "./quiz/run";

/** prints a block of text and returns the exit code, keeping main a simple dispatcher. */
function emit(text: string, code: number): number {
  console.log(text);
  return code;
}

/** runs the quiz command: asks the questions of one topic and prints the final score. */
async function quizCommand(id: string | undefined): Promise<number> {
  if (id === undefined) return emit("usage : ts-man quiz <id>", 1);
  const score = await runQuiz(id);
  if (score === undefined) return emit(`aucune question pour : ${id}`, 1);
  return emit(scoreLine(score), 0);
}

/** dispatches one parsed command to its handler and returns the process exit code. */
async function dispatch(command: string, args: string[]): Promise<number> {
  const [first] = args;
  switch (command) {
    case "list":
      return emit(runList().output, 0);
    case "show": {
      const out = runShow(first);
      return emit(out.output, out.code);
    }
    case "search": {
      const out = runSearch(args.join(" "));
      return emit(out.output, out.code);
    }
    case "quiz":
      return quizCommand(first);
    case "version":
      return emit(version, 0);
    case "help":
      return emit(usage, 0);
    default:
      return emit(`commande inconnue : ${command}\n\n${usage}`, 1);
  }
}

const invocation = parseArgs(process.argv.slice(2));
process.exitCode = await dispatch(invocation.command, invocation.args);
