import {FinanceElement, Finances} from '../models';

export class FinancesHelper {
  public static groupByUser(finances: Finances): Map<string, FinanceElement[]> {
    const map: Map<string, FinanceElement[]> = new Map<string, FinanceElement[]>();
    if (!finances) { return map; }
    finances.elements.forEach((el) => {
      if (map.has(el.buyer)) {
        map.get(el.buyer).push(el);
      }
      else {
        map.set(el.buyer, [el]);
      }
    });
    return map;
  }

  public static sumFinancesByUser(groupedMap: Map<string, FinanceElement[]>): Map<string, number> {
    const map: Map<string, number> = new Map<string, number>();
    groupedMap.forEach(((value, key) => {
      let sum = 0;
      value.forEach((el) => {
        sum += el.price;
      });
      map.set(key, sum);
    }));
    return map;
  }

  // public static groupByElement(groupedMap: Map<string, FinanceElement[]>): Map<string, FinanceElement[]> {
  //   const map: Map<string, FinanceElement[]> = new Map<string, FinanceElement[]>();
  //   groupedMap.forEach(((financeElements, buyer) => {
  //     let financeElement: FinanceElement = null;
  //     financeElements.forEach((el) => {
  //       if (!financeElement) {
  //         financeElement = {...el, price: el.price * el.amount};
  //       }
  //       if (!!financeElement && financeElement.id === el.id) {
  //         // tslint:disable-next-line:max-line-length
  //         financeElement = {...financeElement, price: financeElement.price + (el.price * el.amount), amount: financeElement.amount + el.amount};
  //       }
  //     })
  //   }))
  // }
}
