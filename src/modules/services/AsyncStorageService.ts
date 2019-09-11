import * as SecureStore from 'expo-secure-store';
import { Observable, from, throwError } from 'rxjs';
import { map, timeoutWith } from 'rxjs/operators';

import { ENV } from '../../constants';
import { Logger } from './Logger';
import { safeParse } from '../../utils/generalUtils';

export class AsyncStorageService {
  private storage = SecureStore;

  public setItem(key: string, item: any): Observable<void> {
    Logger.log(`storage: setting ${key}:`, item);
    return from(this.storage.setItemAsync(key, JSON.stringify(item))).pipe(
      timeoutWith(ENV.STORAGE_TIMEOUT, throwError(new Error(`storage: timeout setting ${key}`)))
    );
  }

  public getItem<T>(key: string): Observable<T> {
    Logger.log(`storage: getting ${key}`);
    return from(this.storage.getItemAsync(key)).pipe(
      timeoutWith(ENV.STORAGE_TIMEOUT, throwError(new Error(`storage: timeout getting ${key}`))),
      map(item => safeParse(item))
    );
  }

  public removeItem(key: string): Observable<void> {
    Logger.log(`storage: removing ${key}`);
    return from(this.storage.deleteItemAsync(key)).pipe(timeoutWith(ENV.STORAGE_TIMEOUT, throwError(new Error(`storage: timeout setting ${key}`))));
  }
}
