import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { UserNotificationsService } from './user-notifications.service';

@Injectable()
export class OSVRServerService {
    private startServerURL = "/api/startserver";
    private stopServerURL = "/api/stopserver";
    private restartServerURL = "/api/restartserver";

    constructor(
        private http: Http,
        private userNotifications: UserNotificationsService) { }

    startServer(): Observable<void> {
        var observable = this.http.post(this.startServerURL, {}).map(
            response => { });

        return this.userNotifications.wrapObservable(observable,
            "OSVR server started successfully!", "Could not start the OSVR server.");
    }

    stopServer(): Observable<void> {
        var observable = this.http.post(this.stopServerURL, {}).map(
            response => { });

        return this.userNotifications.wrapObservable(observable,
            "OSVR server stopped successfully!", "Could not stop the OSVR server.");
    }

    restartServer(): Observable<void> {
        var observable = this.http.post(this.restartServerURL, {}).map(
            response => { });

        return this.userNotifications.wrapObservable(observable,
            "OSVR server restarted successfully!", "Could not restart the OSVR server.");
    }
}
