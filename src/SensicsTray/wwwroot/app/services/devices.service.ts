import { Injectable } from "@angular/core";
import { Response } from '@angular/http';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { UserNotificationsService } from './user-notifications.service';
import { IUSBDevice, IUSBEvent } from '../models/usb-devices.model';

@Injectable()
export class DevicesService {
    private getUSBDevicesURL = "/api/devices";
    private getUSBEventURL = "/api/usbevent";

    constructor(
        private http: Http,
        private userNotifications: UserNotificationsService) { }
    
    getDevices(): Observable<IUSBDevice[]> {
        console.log("DeviceService : GetDevices");

        var observable = this.http.get(this.getUSBDevicesURL, {}).map(
            response => response.json() as IUSBDevice[]
        );
        return this.userNotifications.wrapObservable(observable,
            null, "Could not get the USB device list.");
    }

    getUSBEevent(): Observable<IUSBEvent> {
        console.log("DeviceService:getUSBEvent:  ");
        var observable = Observable
            .interval(2000)
            .switchMap(() => this.http.get(this.getUSBEventURL))
            .map(response => response.json() as IUSBEvent);

        return this.userNotifications.wrapObservable(observable,
            null, "Could not get USB events.");
    }
}
