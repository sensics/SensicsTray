import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { UserNotificationsService } from './user-notifications.service';

import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class OSVRServerService {
    private startServerURL = "/api/startserver";
    private stopServerURL = "/api/stopserver";

    constructor(
        private http: Http,
        private userNotifications: UserNotificationsService) { }

    startServer(): Promise<any> {
        var promise = this.http.post(this.startServerURL, {}).toPromise().then(
            response => response.json() as any);

        return this.userNotifications.wrapPromise(promise,
            "OSVRServerService.startServer() - success!", "Could not start the OSVR server.");
    }

    stopServer(): Promise<any> {
        var promise = this.http.post(this.stopServerURL, {}).toPromise().then(
            response => response.json() as any);

        return this.userNotifications.wrapPromise(promise,
            "OSVRServerService.stopServer() - success!", "Could not stop the OSVR server.");
    }
}
