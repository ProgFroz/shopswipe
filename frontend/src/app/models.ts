export interface User {
  uid: string;
  email: string;
  imageUrl: string;
  username: string;
  date: Date;
  gid: string;
}
export interface Group {
  gid: string;
  name: string;
  date: Date;
  members?: User[];
  code: string;
  owner: string;
}
export enum LoadingState {
  UNINITIALIZED,
  LOADING,
  FINISHED
}
export interface Shopping {
  gid: string;
  sid: string;
  elements: ShoppingElement[];
  date: Date;
}
export interface ShoppingElement {
  id: string;
  name: string;
  uid: string;
  description: string;
  amount: number;
  isRepeatable: boolean;
  isActive: boolean;
  date: Date;
}
export interface Finances {
  gid: string;
  date: Date;
  elements: FinanceElement[];
}
export interface FinanceElement {
  id: string;
  name: string;
  author: string;
  buyer: string;
  description: string;
  amount: number;
  price: number;
  date: Date;
}
