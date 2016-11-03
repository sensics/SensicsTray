import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserNotificationsService {
    private currentErrorMessage = "";
    private currentStatusMessage = "";
    private errorMessages = new Subject<string>();
    private statusMessages = new Subject<string>();

    constructor() {
        this.errorMessages.asObservable().subscribe(message => {
            if (typeof message === 'undefined' || message === null) {
                message = "";
            }
            console.error("UserNotificationsService received error message: " + message);
            this.currentErrorMessage = message;
        });
        this.statusMessages.asObservable().subscribe(message => {
            if (typeof message !== 'string' || message === null) {
                message = "";
            }
            if (message.length > 0) {
                console.log("UserNotificationsService received status message: " + message);
            }
            this.currentStatusMessage = message;
        });
    }

    getCurrentErrorMessage(): string {
        return this.currentErrorMessage;
    }

    getCurrentStatusMessage(): string {
        return this.currentStatusMessage;
    }

    getErrorMessages(): Observable<string> {
        return this.errorMessages.asObservable();
    }

    getStatusMessages(): Observable<string> {
        return this.statusMessages.asObservable();
    }

    showError(message: string): void {
        this.errorMessages.next(message);
    }

    showStatus(message: string): void {
        this.statusMessages.next(message);
    }

    wrapPromise<T>(promise: Promise<T>, successMessage?: string): Promise<T> {
        return promise.then(
            value => {
                if (typeof successMessage !== 'undefined' && successMessage !== null) {
                    this.showStatus(successMessage);
                }
                return value;
            },
            error => {
                if (typeof error === 'string') {
                    this.showError(error.toString());
                }
                throw error;
            });
    }
}
