/** the parsed command line: the sub-command to run and its positional arguments. */
export interface Invocation {
  command: string;
  args: string[];
}

/** the command used when none is given on the command line. */
export const defaultCommand = "help";

/** splits raw argv (without the runtime and script path) into a command and its arguments. */
export function parseArgs(argv: string[]): Invocation {
  const [command, ...args] = argv;
  if (command === undefined || command === "") {
    return { command: defaultCommand, args: [] };
  }
  return { command: command.toLowerCase(), args };
}
