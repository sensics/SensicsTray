import { Injectable } from "@angular/core";
import { Response } from '@angular/http';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { UserNotificationsService } from './user-notifications.service';

@Injectable()
export class DevicesService {
    private getUSBDevicesURL = "/api/GetUSBDevices";
    private getUSBEventURL = "/api/GetUSBEvent";

    constructor(
        private http: Http,
        private userNotifications: UserNotificationsService) { }
    
    getDevices(): Observable<Response> {
        console.log("DeviceService : GetDevices");

        var observable = this.http.get(this.getUSBDevicesURL, {}).map(
            response => response.json() as Response
        );
        return observable;
    }

    getUSBEevent(): Observable<Response> {
        console.log("DeviceService:getUSBEvent:  ");
        return Observable
            .interval(2000)
            .switchMap(() => this.http.get(this.getUSBEventURL))
            .map(response => response.json())
            ;
    }
}
