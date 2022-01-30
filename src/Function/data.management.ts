const CMD_KEY = "user-cmd-";
const NB_CMD_KEY = "user-nb-cmd";

export function loadCommands(nbCommands: number): string[][] {
  //
  nbCommands = +window.localStorage.getItem(NB_CMD_KEY);
  let cmd: string[][] = [];
  let i = 0;
  while (i < nbCommands) {
    const line = window.localStorage.getItem(CMD_KEY + i);
    cmd.push(line.split("-"));
    i++;
  }
  return cmd;
}

export function clearCommands() {
  //
  window.localStorage.clear();
}
export function saveCommand(option: string[], total: number, nbCommands: number) {
  //
  let items = ["principal"];
  items = items.concat(option);
  items.push(total.toString());
  let cmd = items.join("-");
  window.localStorage.setItem(`${CMD_KEY}${nbCommands++}`, cmd);
  window.localStorage.setItem(NB_CMD_KEY, nbCommands.toString());
}
