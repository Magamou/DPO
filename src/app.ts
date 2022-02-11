import { decoration, renderPrice } from "./Function/decoration";
import {
  loadCommands,
  saveCommand,
  clearCommands,
} from "./Function/data.management";
import { PlatDeResistance } from "./Classes/plat.resistant";
import { IPlat } from "./Interfaces/plat";

//declaration

let option: string[] = [];
let menu = document.querySelector("#menu") as HTMLSelectElement;//
let arr: HTMLInputElement[] = Array.from(menu.querySelectorAll("input"));
let platSimple: IPlat = new PlatDeResistance();
let tableContainer = document.querySelector("#table-container");//
let tabletitle = document.querySelector("#table-title");//
let viewCmd = document.querySelector("#viewCmd") as HTMLElement;

let table = document.querySelector("table");//
let thead = table.querySelector("thead");//
let tbody = table.querySelector("tbody");//
let tfoot = table.querySelector("tfoot");//
let total = platSimple.prix();

let nbCommands = 0;

renderPrice(platSimple.prix());

loadCommands(nbCommands);

document.querySelector("#add").addEventListener("click", (e) => {
  console.log("add event");
  if(menu.className==="open"){
    menu.className="close";
  }
  else{
    menu.className="open";
  }
  
});

arr.forEach((e) => {
  e.addEventListener("click", (event: Event) => {
    if (e.checked) {
      option.push(e.name);
    } else {
      option = option.filter((opt) => {
        return opt !== e.name;
      });
    }
    total = decoration(option, platSimple);
  });
});

document.querySelector("#send").addEventListener("click", (e) => {
  tabletitle.innerHTML = "Historique de mes commandes";
  thead.innerHTML = `<tr><th scope="col">Commande</th><th scope="col" >Prix</th></tr>`;
  tbody.innerHTML = "";
  tfoot.innerHTML = "";
  menu.className = "close";
  tbody.insertAdjacentHTML(
    "beforeend",
    `
        <tr> <td>Plat principal</td> <td>5000</td> </tr>
        `
  );
  option.forEach((e) => {
    tbody.insertAdjacentHTML(
      "beforeend",
      `
        <tr> <td class="text-capitalize">${e}</td> <td>${
        (<HTMLInputElement>document.querySelector("#" + e)).value
      }</td> </tr>
        `
    );
  });
  // console.log(`total des achats ${total}`);
  tfoot.insertAdjacentHTML(
    "beforeend",
    `
        <tr class="food-card_price"> <td>Total</td> <td>${total} ${
      total > 0 ? "CFA" : ""
    }</td> </tr>
        `
  );
  tableContainer.className = "open";
  document.querySelector("#order-footer").classList.remove("open-flex");
  document.querySelector("#order-footer").classList.add("close");
  tabletitle.innerHTML = "Détails de votre commande";
  saveCommand(option, total, nbCommands);
  loadCommands(nbCommands);
});

viewCmd.addEventListener("click", (e) => {
    let cmdList = loadCommands(nbCommands);
  if (viewCmd.innerText === "Voir mes commandes") {
    console.log("vmc");
    renderCmdList(cmdList);
  } else if (viewCmd.innerText === "Effacer tout") {
    clearCommands();
    renderCmdList(cmdList);
  }
});


function renderCmdList(_cmdList:string[][]) {
//   let cmdList = loadCommands(nbCommands);
  thead.innerHTML = "";
  tbody.innerHTML = "";
  tfoot.innerHTML = "";
  menu.className = "close";
  tabletitle.innerHTML = "Historique de mes commandes";
  tbody.insertAdjacentHTML(
    "beforeend",
    `
        <tr> 
        <td>Plat</td> 
        <td>Entree</td>
        <td>Dessert</td>
        <td>Boisson</td>
        <td>The</td>
        <td>Cafe</td>
        <td>Livré</td>
        <td>Prix</td>
         </tr>
        `
  );
  let i: number = 0;
  let allTotal = 0;
  _cmdList.forEach((cmd: string[]) => {
    const prix = +cmd[cmd.length - 1];
    allTotal += prix;
    let html = `<tr class="${i % 2 == 0 ? "pair" : "impair"}">
        <td>Thiébou Diene</td> 
        <td>${
          cmd.indexOf("entree") > -1
            ? '<i class="fa fa-check"></i>'
            : '<i class="fa fa-times"></i>'
        }</td>
        <td>${
          cmd.indexOf("dessert") > -1
            ? '<i class="fa fa-check"></i>'
            : '<i class="fa fa-times"></i>'
        }</td>
        <td>${
          cmd.indexOf("boisson") > -1
            ? '<i class="fa fa-check"></i>'
            : '<i class="fa fa-times"></i>'
        }</td>
        <td>${
          cmd.indexOf("the") > -1
            ? '<i class="fa fa-check"></i>'
            : '<i class="fa fa-times"></i>'
        }</td>
        <td>${
          cmd.indexOf("cafe") > -1
            ? '<i class="fa fa-check"></i>'
            : '<i class="fa fa-times"></i>'
        }</td>
        <td>${
          cmd.indexOf("livraison") > -1
            ? '<i class="fa fa-check"></i>'
            : '<i class="fa fa-times"></i>'
        }</td>
        <td>${prix}</td>
        </tr>`;
    i++;

    tbody.insertAdjacentHTML("beforeend", html);
  });
  tbody.insertAdjacentHTML(
    "beforeend",
    `<tr> 
        <td class="food-card_price total-footer">TOTAL</td> 
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="food-card_price total-footer">${allTotal}&nbsp;CFA</td>
         </tr>`
  );

  tableContainer.className = "open";
  document.querySelector("#order-footer").classList.remove("open-flex");
  document.querySelector("#order-footer").classList.add("close");
  viewCmd.innerHTML = "Effacer tout";
}
