export enum Status {
  NEW = 1,
  INPROGRESS = 2,
  DONE = 3,
  ACTCHIVE = 4,
  CLOSE = 5,
}

export const color = {
  [Status.NEW]: "#F56C6C",
  [Status.INPROGRESS]: "#409EFF",
  [Status.DONE]: "#67C23A",
  [Status.ACTCHIVE]: "#E6A23C",
  [Status.CLOSE]: "#F56C6C",
};

export interface StatusInterface {
  label: string;
  value: Status;
}

export interface TodoItem {
  id: number;
  title: string;
  description: string;
  status: Status;
}

export interface TodoItem1 {
  id: string;
  title: string;
  description: string;
  status: Status;
  date: Date;
  todos: string[]
}

