export enum Status {
  NEW = 1,
  INPROGRESS = 2,
  DONE = 3,
  ACTCHIVE = 4,
}

export interface StatusInterface {
  label: string;
  value: Status;
}
