import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { UserNotificationsService } from './user-notifications.service';

@Injectable()
export class OSVRServerService {
    private startServerURL = "/api/startserver";
    private stopServerURL = "/api/stopserver";
    private restartServerURL = "/api/restartserver";
    private runningServerPathsURL = "api/runningserverpaths";

    private suggestRestart = false;

    constructor(
        private http: Http,
        private userNotifications: UserNotificationsService) { }

    startServer(): Observable<void> {
        this.suggestRestart = false;
        var observable = this.http.post(this.startServerURL, {}).map(
            response => { });

        return this.userNotifications.wrapObservable(observable,
            "OSVR server started successfully!", "Could not start the OSVR server.");
    }

    stopServer(): Observable<void> {
        var observable = this.http.post(this.stopServerURL, {}).map(
            response => { });

        return this.userNotifications.wrapObservable(observable,
            "OSVR server stopped successfully!", "Could not stop the OSVR server.");
    }

    restartServer(): Observable<void> {
        this.suggestRestart = false;
        var observable = this.http.post(this.restartServerURL, {}).map(
            response => { });

        return this.userNotifications.wrapObservable(observable,
            "OSVR server restarted successfully!", "Could not restart the OSVR server.");
    }

    getRunningServerPaths(): Observable<string[]> {
        var observable = Observable
            .interval(500)
            .switchMap(() => this.http.get(this.runningServerPathsURL))
            .map(response => response.json() as string[]);

        //var observable = this.http.get(this.runningServerPathsURL).map(
        //    response => response.json());

        return this.userNotifications.wrapObservable(observable,
            null, "Could not get the currently running server.");
    }

    getSuggestServerRestart() { return this.suggestRestart; }
    setSuggestServerRestart(value: boolean) { this.suggestRestart = value; }
    
}
