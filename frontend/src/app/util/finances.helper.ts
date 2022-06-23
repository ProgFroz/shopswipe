import {FinanceElement, Finances} from '../models';
import * as moment from 'moment';

export class FinancesHelper {
  public static months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public static groupByUser(groupedMap: Map<string, FinanceElement[]>): Map<string, Map<string, FinanceElement[]>> {
    const overallMap: Map<string, Map<string, FinanceElement[]>> = new Map<string, Map<string, FinanceElement[]>>();
    groupedMap.forEach(((elements, month) => {
      const map: Map<string, FinanceElement[]> = new Map<string, FinanceElement[]>();
      elements.forEach((el) => {
        if (map.has(el.buyer)) {
          map.get(el.buyer).push(el);
        }
        else {
          map.set(el.buyer, [el]);
        }
      });
      overallMap.set(month, map);
    }));
    return overallMap;
  }

  public static groupByMonth(finances: Finances): Map<string, FinanceElement[]> {
    const map: Map<string, FinanceElement[]> = new Map<string, FinanceElement[]>();
    if (!finances) { return map; }
    finances.elements.forEach((el) => {
      const month = moment(el.date).month();
      const year = moment(el.date).year();
      const key = this.createMonthYearKey(month, year);
      if (map.has(key)) {
        map.get(key).push(el);
      }
      else {
        map.set(key, [el]);
      }
    });
    console.log('1', map);
    return map;
  }

  public static sumFinancesByUser(groupedMap: Map<string, Map<string, FinanceElement[]>>): Map<string, Map<string, number>> {
    const overallMap: Map<string, Map<string, number>> = new Map<string, Map<string, number>>();
    groupedMap.forEach(((value, month) => {
      const map: Map<string, number> = new Map<string, number>();
      value.forEach((elements, uid) => {
        let sum = 0;
        elements.forEach((el) => {
          sum += el.price;
        });
        map.set(uid, sum);
      });
      overallMap.set(month, map);
    }));
    return overallMap;
  }

  public static getMonthByNumber(num: number): string {
    return this.months[num % 12];
  }

  public static createMonthYearKey(m: number, y: number): string {
    return m + '-' + y;
  }

  public static getMonthNameFromMonthYearKey(str: string): string {
    const arr = str.split('-');
    if (arr.length < 2) { return '-'; }
    return this.getMonthByNumber(Number(arr[0]));
  }

  public static getMonthFromMonthYearKey(str: string): number {
    const arr = str.split('-');
    if (arr.length < 2) { return -1; }
    return Number(arr[0]);
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
  static getMostRecentMonths(groupedMap: Map<string, Map<string, FinanceElement[]>>, amountMonths: number): Map<string, Map<string, FinanceElement[]>> {
    const map: Map<string, Map<string, FinanceElement[]>> = new Map<string, Map<string, FinanceElement[]>>();

    for (let i = 0; i < amountMonths; i++) {
      const currentMonth = moment().subtract(i, 'month').month();
      const currentYear = moment().subtract(i, 'month').year();
      const my = this.createMonthYearKey(currentMonth, currentYear);
      map.set(my, groupedMap.get(my));
    }

    const inv = new Map([...map].reverse());
    return inv;
  }
}
export interface MonthYear {
  month: number;
  year: number;
  monthName: string;
}
