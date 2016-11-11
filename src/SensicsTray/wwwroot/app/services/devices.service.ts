import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { UserNotificationsService } from './user-notifications.service';

@Injectable()
export class DevicesService {
    private startDeviceMonitorUrl = "/api/startdevmonitor";
    constructor(
        private http: Http,
        private userNotifications: UserNotificationsService) { }

    startDeviceMonitor(): Observable<any> {
        var observable = this.http.post(this.startDeviceMonitorUrl, {}).map(
            response => response.json() as any);
        return this.userNotifications.wrapObservable(observable,
            "Device monitor started!", "Could not start device monitor.");
    }
}
