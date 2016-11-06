import { Injectable } from "@angular/core";
import { Response } from '@angular/http';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { UserNotificationsService } from './user-notifications.service';

import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DevicesService {
    private getUsbDevicesUrl = "/api/getusbdevices";
    constructor(
        private http: Http,
        private userNotifications: UserNotificationsService) { }
    
    //startDeviceMonitor(): Promise<any> {
    //    var promise = this.http.post(this.startDeviceMonitorUrl, {}).toPromise().then(
    //        response => response.json() as any);
    //    return this.userNotifications.wrapPromise(promise, "Device monitor started!");
    //}
    getDevices(): Observable<Response> {
        console.log("DeviceService : GetDevices");
        return this.http.get(this.getUsbDevicesUrl);
    }
}
