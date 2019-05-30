export const printError = (...linesToPrint) => {
  const DASHED_LINE = '------------------------------------------------------------------------------------------------------------------';
  const CONSOLE_RED = '\x1b[31m';
  const CONSOLE_RESET_COLOUR = '\x1b[0m';

  console.log(DASHED_LINE);
  linesToPrint.forEach(line => console.log(CONSOLE_RED, line));
  console.log(CONSOLE_RESET_COLOUR, DASHED_LINE);
}
