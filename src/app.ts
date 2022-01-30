import { Boisson, Cafe, Dessert, Entree, Livraison, The } from "./Classes/option";
import { PlatDeResistance } from "./Classes/plat.resistant";
import {IPlat}  from './Interfaces/plat';
//declaration
let choix:IPlat[]=[];
let option:string[]=[];
let menu=document.querySelector("#menu") as HTMLSelectElement;
let arr:HTMLInputElement[]=Array.from(menu.querySelectorAll("input"));
let platSimple:IPlat=new PlatDeResistance();
let tableContainer=document.querySelector("#table-container");
let table=document.querySelector("table");
let tbody=table.querySelector("tbody");
let tfoot=table.querySelector("tfoot");
let total=platSimple.prix();

choix.push(platSimple);
console.log(`Plat de resistance: ${platSimple.prix()}`);
renderPrice(platSimple.prix());



document.querySelector("#add").addEventListener("click", (e)=>{
    if(menu.className==="open"){
        menu.className="close";
    }
    else{
        menu.className="open";
        tableContainer.className="close";
    }
    
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
    tbody.innerHTML="";
    tfoot.innerHTML="";
    menu.className="close";
    tbody.insertAdjacentHTML("beforeend", `
        <tr> <td>Plat principal</td> <td>5000</td> </tr>
        `)
        saveData(option);
    option.forEach((e)=>{
        // let _input=document.querySelector("#"+e) as HTMLInputElement
        // console.log(_input.value);
        // console.log(e, " ", (<HTMLInputElement>document.querySelector("#"+e)).value)
        tbody.insertAdjacentHTML("beforeend", `
        <tr> <td >${e}</td> <td>${(<HTMLInputElement>document.querySelector("#"+e)).value}</td> </tr>
        `)
    })
    // console.log(`total des achats ${total}`);
    tfoot.insertAdjacentHTML("beforeend", `
        <tr> <td>total</td> <td>${total}</td> </tr>
        `)
        tableContainer.className="open";
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

function saveData(array:string[]){
    console.log(array.join(","));
}