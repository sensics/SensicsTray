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

    startServer(): Promise<void> {
        var ret = this.http.get(this.startServerURL)
            .toPromise() as any;

        return this.userNotifications.wrapPromise<void>(ret,
            "OSVRServerService.startServer() - success!");
    }

    stopServer(): Promise<void> {
        return this.userNotifications.wrapPromise(Promise.resolve(),
            "OSVRServerService.stopServer() - success!");
    }
}
