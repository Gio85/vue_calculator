export interface IState {
  currentValue: string;
  previousValue: string;
  result: string;
  operation: TOperation;
  isEqual: boolean;
}

export type TOperation = "/" | "+" | "x" | "-";
