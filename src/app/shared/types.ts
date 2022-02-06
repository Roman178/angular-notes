export interface IDataToEmit<T = any> {
  change: any;
  event: T;
}

export enum NoteEvents {
  ADD = 'ADD',
  UPDATE = 'UPDATE',
  REMOVE = 'REMOVE',
}
