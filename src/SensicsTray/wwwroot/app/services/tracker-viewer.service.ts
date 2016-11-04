import { Injectable } from '@angular/core';
import { Http } from "@angular/http"
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

import { UserNotificationsService } from './user-notifications.service';

@Injectable()
export class TrackerViewerService {
    private startTrackerViewerURL = "/api/startTrackerViewer";

    constructor(private userNotifications: UserNotificationsService) { }

    startTrackerViewer(paths: string[] | string): Promise<void> {
        if (typeof paths === 'undefined' || paths === null) {
            paths = [];
        }
        if (typeof paths === 'string') {
            paths = (<string>paths).split(" ");
        }
        return this.userNotifications.wrapPromise(Promise.resolve(),
            "TrackerViewerService.startTrackerViewer() - success!");
    }
}
