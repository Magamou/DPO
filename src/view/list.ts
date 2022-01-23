import { Transaction } from "../Classes/transaction";
import { IView } from "../Interfaces/IView";

export class DrowList implements IView{
    constructor(){}
    Render(data: Transaction[]) {
        let ul = document.querySelector("#liste");
            ul.innerHTML = "";
            data.forEach((obj) => {
              ul.insertAdjacentHTML(
                "beforeend",
                `
                <li class=${obj.getType() === "Debit" ? "debit" : "credit"}>
                ${obj.getType() === "Debit" ? "Debit:" : "Credit:"}<br>
                ${obj.getMontant()} F ont été ${obj.getType() === "Debit" ? "Retiré" : "Déposé"}
                par ${obj.getName()} pour ${obj.getMotif()} </li>
                `
               )})
    }
    
 }
