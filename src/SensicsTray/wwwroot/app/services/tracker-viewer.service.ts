import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from "@angular/http"
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

import { UserNotificationsService } from './user-notifications.service';

@Injectable()
export class TrackerViewerService {
    private startTrackerViewerURL = "/api/startTrackerViewer";

    constructor(
        private userNotifications: UserNotificationsService,
        private http: Http)
    { }

    startTrackerViewer(paths: string[] | string): Promise<any> {
        if (typeof paths === 'undefined' || paths === null) {
            paths = [];
        }
        if (typeof paths === 'string') {
            paths = (<string>paths).split(" ");
        }

        var promise = this.http.post(
            this.startTrackerViewerURL + `?paths=${paths.join(',')}`, {}).toPromise()
            .then(response => response.json() as any);

        return this.userNotifications.wrapPromise(promise,
            "TrackerViewerService.startTrackerViewer() - success!");
    }
}
