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
        return this.userNotifications.wrapPromise(promise, null, "Could not get the current OSVR server configuration.");
    }

    setCurrent(newConfig: OSVRConfig.IOSVRConfig): Promise<OSVRConfig.ISetCurrentConfigResponse> {
        var promise = this.http.post("/api/currentconfig", newConfig).toPromise().then(
            response => response.json() as OSVRConfig.ISetCurrentConfigResponse);
        return this.userNotifications.wrapPromise(promise, null, "Could not set the current OSVR server configuration.");
    }

    getAvailableManualLoadPlugins(): Promise<OSVRConfig.IOSVRPlugin[]> {
        var promise = this.http.get("/api/availablemanualloadplugins").toPromise().then(
            response => response.json() as OSVRConfig.IOSVRPlugin[]);
        return this.userNotifications.wrapPromise(promise, null, "Could not get the list of available manually loaded plugins.");
    }

    getAvailableDisplays(): Promise<OSVRConfig.IOSVRDisplay[]> {
        var promise = this.http.get("/api/availabledisplays").toPromise().then(
            response => response.json() as OSVRConfig.IOSVRDisplay[]);
        return this.userNotifications.wrapPromise(promise, null, "Could not get the list of available displays.");
    }

    getCurrentServerRoot(): Promise<string> {
        var promise = this.http.get("/api/serverroot").toPromise().then(
            response => response.text());
        return this.userNotifications.wrapPromise(promise, null, "Could not get the current osvr server root directory.");
    }

    keepAlive(): Promise<void> {
        var promise = this.http.post("/api/keepAlive", {}).toPromise().then(
            (response) => { });
        return this.userNotifications.wrapPromise(promise);
    }
}
