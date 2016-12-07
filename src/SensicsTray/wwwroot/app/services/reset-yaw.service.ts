import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from "@angular/http"
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { UserNotificationsService } from './user-notifications.service';

@Injectable()
export class ResetYawService {
    constructor(
        private userNotifications: UserNotificationsService,
        private http: Http)
    { }

    private getParams(path: string) {
        var params = new URLSearchParams();
        if (typeof path === "string" && path.length > 0) {
            params.set("path", path);
        }
        return params;
    }

    resetYaw(path: string = null): Observable<void> {
        var params = this.getParams(path);
        var observable = this.http.post("/api/resetyaw", {}, { search: params })
            .map(response => { });
        return this.userNotifications.wrapObservable(observable,
            "Successfully reset yaw!", "Could not reset yaw.");
    }
}
