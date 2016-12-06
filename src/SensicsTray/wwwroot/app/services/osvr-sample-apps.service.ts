import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import * as OSVRSampleApps from '../models/osvr-sample-apps.model';
import { UserNotificationsService } from './user-notifications.service';

@Injectable()
export class OSVRSampleAppsService {
    constructor(
        private http: Http,
        private userNotifications: UserNotificationsService)
    { }

    getSampleApps(): Observable<OSVRSampleApps.ISampleApp[]> {
        var observable = this.http.get("/api/sampleapps").map(
            response => response.json() as OSVRSampleApps.ISampleApp[]);
        return this.userNotifications.wrapObservable(observable,
            null, "Could not get a list of OSVR sample apps.");
    }

    runSampleApp(sampleApp: OSVRSampleApps.ISampleApp): Observable<void> {
        var params = new URLSearchParams();
        params.set("sampleAppFileName", sampleApp.fileName);
        var observable = this.http.post("/api/runsampleapp", {}, { search: params }).map(_ => { });
        return this.userNotifications.wrapObservable(observable,
            `Sample app ${sampleApp.name} launched successfully!`,
            `Could not run sample app ${sampleApp.name}.`);
    }
}
