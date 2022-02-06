import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IDataToEmit } from './types';

@Injectable()
export class ShareDataService {
  private emitChangeData = new Subject<any>();
  changeEmitted$ = this.emitChangeData.asObservable();

  emitChange<T>(change, event) {
    const dataToEmit: IDataToEmit<T> = { change, event };
    this.emitChangeData.next(dataToEmit);
  }
}
