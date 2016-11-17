import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from "@angular/http"
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { UserNotificationsService } from './user-notifications.service';

@Injectable()
export class DirectModeService {
    private enableDirectModeURL = "/api/enableDirectMode";
    private disableDirectModeURL = "/api/disableDirectMode";

    constructor(
        private userNotifications: UserNotificationsService,
        private http: Http)
    { }

    private getParams(threeLetterVendorPNPID: string) {
        var params = new URLSearchParams();
        if (typeof threeLetterVendorPNPID === "string" && threeLetterVendorPNPID.length > 0) {
            params.set("threeLetterVendorPNPID", threeLetterVendorPNPID);
        }
        return params;
    }

    enableDirectMode(threeLetterVendorPNPID: string = null): Observable<void> {
        var params = this.getParams(threeLetterVendorPNPID);
        var observable = this.http.post(this.enableDirectModeURL, {}, { search: params })
            .map(response => { });
        return this.userNotifications.wrapObservable(observable,
            "Enabled direct mode successfully!", "Could not enable direct mode.");
    }

    disableDirectMode(threeLetterVendorPNPID: string = null): Observable<void> {
        var params = this.getParams(threeLetterVendorPNPID);
        var observable = this.http.post(this.enableDirectModeURL, {}, { search: params })
            .map(response => { });
        return this.userNotifications.wrapObservable(observable,
            "Enabled direct mode successfully!", "Could not enable direct mode.");
    }
}
