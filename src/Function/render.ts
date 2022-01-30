export function showMenu(
  menu: HTMLSelectElement,
  tableContainer: Element,
  viewCmd: HTMLElement
): void {
  //
  if (menu.className === "open") {
    menu.className = "close";
  } else {
    menu.className = "open";
    tableContainer.className = "close";
  }
  document.querySelector("#order-footer").classList.remove("close");
  document.querySelector("#order-footer").classList.add("open-flex");
  viewCmd.innerHTML = "Voir mes commandes";
}


