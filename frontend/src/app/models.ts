export interface User {
  uid: string;
  imageUrl: string;
  username: string;
  date: Date;
  gid: string;
}
export interface Group {
  gid: string;
  name: string;
  date: Date;
  members: User[];
}
