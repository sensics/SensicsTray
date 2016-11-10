import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { UserNotificationsService } from './user-notifications.service';

import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DevicesService {
    private startDeviceMonitorUrl = "/api/startdevmonitor";
    constructor(
        private http: Http,
        private userNotifications: UserNotificationsService) { }

    startDeviceMonitor(): Promise<any> {
        var promise = this.http.post(this.startDeviceMonitorUrl, {}).toPromise().then(
            response => response.json() as any);
        return this.userNotifications.wrapPromise(promise, "Device monitor started!", "Could not start device monitor.");
    }
}
