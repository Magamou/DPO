import { Boisson, Cafe, Dessert, Entree, Livraison, The } from "./Classes/option";
import { PlatDeResistance } from "./Classes/plat.resistant";
import {IPlat}  from './Interfaces/plat';
//declaration 


const CMD_KEY = 'user-cmd-';
const NB_CMD_KEY= 'user-nb-cmd'
let choix:IPlat[]=[];
let option:string[]=[];
let menu=document.querySelector("#menu") as HTMLSelectElement;
let arr:HTMLInputElement[]=Array.from(menu.querySelectorAll("input"));
let platSimple:IPlat=new PlatDeResistance();
let tableContainer=document.querySelector("#table-container");
let tabletitle = document.querySelector("#table-title");
let viewCmd = document.querySelector("#viewCmd");

let table=document.querySelector("table");
let thead=table.querySelector("thead");
let tbody=table.querySelector("tbody");
let tfoot=table.querySelector("tfoot");
let total=platSimple.prix();

let nbCommands = 0;

choix.push(platSimple);
console.log(`Plat de resistance: ${platSimple.prix()}`);
renderPrice(platSimple.prix());

loadCommands();

document.querySelector("#add").addEventListener("click", (e)=>{
    if(menu.className==="open"){
        menu.className="close";
    }
    else{
        menu.className="open";
        tableContainer.className="close";
    }
    document.querySelector("#order-footer").classList.remove("close");
    document.querySelector("#order-footer").classList.add("open-flex");
    viewCmd.innerHTML = "Voir mes commandes";
})

arr.forEach((e)=>{
    e.addEventListener("click", (event:Event)=>{
        if(e.checked){
            option.push(e.name);
            // platSimple=getPlat(platSimple, e.name);
            // console.log("price", platSimple.prix());
        }
        else{
            option=option.filter((opt)=>{
                return opt !== e.name;
            })
        }
        total=decoration(option, platSimple);
    })    
})


document.querySelector("#send").addEventListener("click", (e)=>{
    tabletitle.innerHTML="Historique de mes commandes"
    thead.innerHTML=`<tr><th scope="col">Commande</th><th scope="col" >Prix</th></tr>`
    tbody.innerHTML="";
    tfoot.innerHTML="";
    menu.className="close";
    tbody.insertAdjacentHTML("beforeend", `
        <tr> <td>Plat principal</td> <td>5000</td> </tr>
        `)
    option.forEach((e)=>{
        // let _input=document.querySelector("#"+e) as HTMLInputElement
        // console.log(_input.value);
        // console.log(e, " ", (<HTMLInputElement>document.querySelector("#"+e)).value)
        tbody.insertAdjacentHTML("beforeend", `
        <tr> <td class="text-capitalize">${e}</td> <td>${(<HTMLInputElement>document.querySelector("#"+e)).value}</td> </tr>
        `)
    })
    // console.log(`total des achats ${total}`);
    tfoot.insertAdjacentHTML("beforeend", `
        <tr class="food-card_price"> <td>Total</td> <td>${total} ${total>0? 'CFA': ''}</td> </tr>
        `)
        tableContainer.className="open";
        document.querySelector("#order-footer").classList.remove("open-flex");
        document.querySelector("#order-footer").classList.add("close");
        tabletitle.innerHTML="Détails de votre commande";
        saveCommand();
        loadCommands();

    })




//////////////functions
function renderPrice(price:number){
    document.querySelector("#price").innerHTML=price.toString();
}

function getPlat(plat:IPlat, decoration:string):IPlat{
    switch(decoration){
        case "entree":
            return new Entree(plat);
        case "dessert":
            return new Dessert(plat);
        case "boisson":
            return new Boisson(plat);
        case "the":
            return new The(plat);
        case "cafe":
            return new Cafe(plat);
        case "livraison":
            return new Livraison(plat);
    }
}
function decoration(arr:string[], plat:IPlat):number{
    // let p:IPlat=new PlatDeResistance();
    arr.forEach((elem)=>{
        plat=getPlat(plat, elem);
    })
    // console.log(plat.prix());
    renderPrice(plat.prix());
    return plat.prix();
}

function saveCommand () {
    let items = ['principal'];
    items = items.concat(option);
    items.push(total.toString())
    console.log('cmd',items);
    let cmd = items.join('-');
    window.localStorage.setItem(`${CMD_KEY}${nbCommands++}`,cmd);
    window.localStorage.setItem(NB_CMD_KEY,nbCommands.toString());

    console.log('cmd', cmd);
}

function clearCommands() {
    window.localStorage.clear();
}


function loadCommands():string[][]{
    nbCommands = +window.localStorage.getItem(NB_CMD_KEY);
    console.log('nb', window.localStorage.getItem(NB_CMD_KEY));
    let cmd : string[][] = [];
    let i=0;
    while (i<nbCommands) {
        const line = window.localStorage.getItem(CMD_KEY+i)
        cmd.push(line.split('-'))
        i++;
    }
    console.log('ZERO',cmd);
    return cmd;
}
(<HTMLSpanElement>document.querySelector('#viewCmd')).addEventListener('click',(e)=>{
    renderCmdList();
}) 

function renderCmdList(){

    let cmdList = loadCommands();
    console.log('one', cmdList);
    thead.innerHTML="";
    tbody.innerHTML="";
    tfoot.innerHTML="";
    menu.className="close";
    tabletitle.innerHTML="Historique de mes commandes"
    tbody.insertAdjacentHTML("beforeend", `
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
        `);
    let i : number = 0;let allTotal = 0;
    cmdList.forEach((cmd:string[])=>{
        const prix = +cmd[cmd.length-1];
        allTotal += prix;
        console.log('rendering', cmd);
        let html =`<tr class="${i%2 == 0 ? 'pair' : 'impair'}">
        <td>Thiébou Diene</td> 
        <td>${(cmd.indexOf('entree') > -1)?'<i class="fa fa-check"></i>':'<i class="fa fa-times"></i>' }</td>
        <td>${(cmd.indexOf('dessert') > -1)?'<i class="fa fa-check"></i>':'<i class="fa fa-times"></i>' }</td>
        <td>${(cmd.indexOf('boisson') > -1)?'<i class="fa fa-check"></i>':'<i class="fa fa-times"></i>' }</td>
        <td>${(cmd.indexOf('the') > -1)?'<i class="fa fa-check"></i>':'<i class="fa fa-times"></i>' }</td>
        <td>${(cmd.indexOf('cafe') > -1)?'<i class="fa fa-check"></i>':'<i class="fa fa-times"></i>' }</td>
        <td>${(cmd.indexOf('livraison') > -1)?'<i class="fa fa-check"></i>':'<i class="fa fa-times"></i>' }</td>
        <td>${prix}</td>
        </tr>`;
        i++;

    tbody.insertAdjacentHTML("beforeend", html);
    });
    tbody.insertAdjacentHTML("beforeend", `<tr> 
        <td class="food-card_price total-footer">TOTAL</td> 
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="food-card_price total-footer">${allTotal}&nbsp;CFA</td>
         </tr>`);

    tableContainer.className="open";
    document.querySelector("#order-footer").classList.remove("open-flex");
    document.querySelector("#order-footer").classList.add("close");
    viewCmd.innerHTML="";
}