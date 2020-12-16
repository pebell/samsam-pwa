import { Injectable } from '@angular/core';
import { ErrorWrapper, unresolved } from '@politie/sherlock';

@Injectable({
    providedIn: 'root'
  })
export class ErrorService {
    constructor( ) { }

    reportError(e: any) {
        console.log('ERROR SERVICE: ', e);
    }

    unresolvedOnError(s: unknown) {
        if ( s instanceof ErrorWrapper) {
            this.reportError(s.error);
            return unresolved;
        }
        return s;
    }
}
