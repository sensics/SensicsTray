import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { UserNotificationsService } from './user-notifications.service';

@Injectable()
export class TrackerViewerService {
    private startTrackerViewerURL = "/api/startTrackerViewer";

    constructor(
        private userNotifications: UserNotificationsService,
        private http: Http)
    { }

    startTrackerViewer(paths: string[] | string): Observable<void> {
        if (typeof paths === 'undefined' || paths === null) {
            paths = [];
        }
        if (typeof paths === 'string') {
            if (paths.length === 0) {
                paths = [];
            } else {
                paths = (<string>paths).split(" ");
            }
        }

        var params = new URLSearchParams();
        if (paths.length > 0) {
            params.set("paths", paths.join(','));
        }

        var observable = this.http.post(this.startTrackerViewerURL, {}, { search: params })
            .map(response => { });
        return this.userNotifications.wrapObservable(observable,
            "Tracker Viewer started successfully!", "Could not start Tracker Viewer");
    }
}
