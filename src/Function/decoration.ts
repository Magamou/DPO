import {
  Boisson,
  Cafe,
  Dessert,
  Entree,
  Livraison,
  The,
} from "../Classes/option";
import { IPlat } from "../Interfaces/plat";
export function decoration(arr: string[], plat: IPlat): number {
  //
  // let p:IPlat=new PlatDeResistance();
  arr.forEach((elem) => {
    plat = getPlat(plat, elem);
  });
  // console.log(plat.prix());
  renderPrice(plat.prix());
  return plat.prix();
}

export function getPlat(plat: IPlat, decoration: string): IPlat {
  //
  switch (decoration) {
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

export function renderPrice(price: number) {
  document.querySelector("#price").innerHTML = price.toString();
}
