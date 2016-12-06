import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import * as OSVRConfig from '../models/osvr-config.model';
import { UserNotificationsService } from './user-notifications.service';
import { OSVRServerService } from './osvr-server.service';

@Injectable()
export class OSVRConfigService  {
    constructor(
        private http: Http,
        private userNotifications: UserNotificationsService,
        private osvrServer: OSVRServerService
    ) { }

    getCurrent(): Observable<OSVRConfig.IOSVRConfig> {
        var observable = this.http.get("/api/currentconfig").map(
            response => response.json() as OSVRConfig.IOSVRConfig);
        return this.userNotifications.wrapObservable(observable, null, "Could not get the current OSVR server configuration.");
    }

    setCurrent(newConfig: OSVRConfig.IOSVRConfig): Observable<void> {
        var observable = this.http.post("/api/currentconfig", newConfig).map(
            response => { });
        this.osvrServer.setSuggestServerRestart(true);
        return this.userNotifications.wrapObservable(observable, null, "Could not set the current OSVR server configuration.");
    }

    getAvailableManualLoadPlugins(): Observable<OSVRConfig.IOSVRPlugin[]> {
        var observable = this.http.get("/api/availablemanualloadplugins").map(
            response => response.json() as OSVRConfig.IOSVRPlugin[]);
        return this.userNotifications.wrapObservable(observable, null, "Could not get the list of available manually loaded plugins.");
    }

    getAvailableDisplays(): Observable<OSVRConfig.IOSVRDisplay[]> {
        var observable = this.http.get("/api/availabledisplays").map(
            response => response.json() as OSVRConfig.IOSVRDisplay[]);
        return this.userNotifications.wrapObservable(observable, null, "Could not get the list of available displays.");
    }

    getSampleConfigs(): Observable<OSVRConfig.IOSVRSampleConfig[]> {
        var observable = this.http.get("/api/sampleConfigs").map(
            response => response.json() as OSVRConfig.IOSVRSampleConfig[]);
        return this.userNotifications.wrapObservable(
            observable, null, "Could nto get the list of available sample configurations.");
    }

    getCurrentServerRoot(): Observable<string> {
        var observable = this.http.get("/api/serverroot").map(
            response => response.text());
        return this.userNotifications.wrapObservable(observable, null, "Could not get the current osvr server root directory.");
    }
}
