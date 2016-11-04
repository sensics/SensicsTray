import { Injectable } from '@angular/core';
import { Http } from "@angular/http"
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

import * as OSVRConfig from '../models/osvr-config.model';
import { UserNotificationsService } from './user-notifications.service';

@Injectable()
export class OSVRConfigService  {
    constructor(
        private http: Http,
        private userNotifications: UserNotificationsService)
    { }

    getCurrent(): Promise<OSVRConfig.IOSVRConfig> {
        var promise = this.http.get("/api/currentconfig").toPromise().then(
            response => response.json() as OSVRConfig.IOSVRConfig);
        return this.userNotifications.wrapPromise(promise);
    }

    setCurrent(newConfig: OSVRConfig.IOSVRConfig): Promise<OSVRConfig.ISetCurrentConfigResponse> {
        return this.userNotifications.wrapPromise(this.http.post("/api/currentconfig", newConfig).toPromise().then(
            response => response.json() as OSVRConfig.ISetCurrentConfigResponse));
    }

    getAvailableManualLoadPlugins(): Promise<OSVRConfig.IOSVRPlugin[]> {
        return this.userNotifications.wrapPromise(this.http.get("/api/availablemanualloadplugins").toPromise().then(
            response => response.json() as OSVRConfig.IOSVRPlugin[]));
    }

    getAvailableDisplays(): Promise<OSVRConfig.IOSVRDisplay[]> {
        return this.userNotifications.wrapPromise(this.http.get("/api/availabledisplays").toPromise().then(
            response => response.json() as OSVRConfig.IOSVRDisplay[]));
    }

    getCurrentServerRoot(): Promise<string> {
        return this.userNotifications.wrapPromise(this.http.get("/api/serverroot").toPromise().then(
            response => response.text()));
    }

    keepAlive(): Promise<void> {
        return this.userNotifications.wrapPromise(this.http.post("/api/keepAlive", {}).toPromise().then(
            (response) => { }));
    }
}
