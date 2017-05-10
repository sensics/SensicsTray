import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { UserNotificationsService } from './user-notifications.service';

@Injectable()
export class HelpService {
    private openDocsUrl = "/api/opendocs";
    private createSysReportUrl = "/api/createsysreport";
    private openSupportTicketUrl = "/api/openticket";

    constructor(
        private http: Http,
        private userNotifications: UserNotificationsService) { }

    openDocs(): Observable<any> {
        var observable = this.http.post(this.openDocsUrl, {}).map(
            response => response.json() as any);
        return this.userNotifications.wrapObservable(observable,
            "Docs opened!", "Could not open docs.");
    }

    createSysReport(): Observable<any> {
        var observable = this.http.post(this.createSysReportUrl, {}).map(
            response => response.json() as any);
        return this.userNotifications.wrapObservable(observable,
            "System report created!", "Could not create system report.");
    }

    openSupportTicket(): Observable<any> {
        var observable = this.http.post(this.openSupportTicketUrl, {}).map(
            response => response.json() as any);
        return this.userNotifications.wrapObservable(observable,
            "Support ticket opened!", "Could not open support ticket.");
    }
}
