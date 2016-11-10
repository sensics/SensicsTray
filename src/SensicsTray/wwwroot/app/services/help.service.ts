import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { UserNotificationsService } from './user-notifications.service';

import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HelpService {
    private openDocsUrl = "/api/opendocs";
    private createSysReportUrl = "/api/createsysreport";
    private openSupportTicketUrl = "/api/openticket";

    constructor(
        private http: Http,
        private userNotifications: UserNotificationsService) { }

    openDocs(): Promise<any> {
        var promise = this.http.post(this.openDocsUrl, {}).toPromise().then(
            response => response.json() as any);
        return this.userNotifications.wrapPromise(promise, "Docs opened!", "Could not open docs.");
    }

    createSysReport(): Promise<any> {
        var promise = this.http.post(this.createSysReportUrl, {}).toPromise().then(
            response => response.json() as any);
        return this.userNotifications.wrapPromise(promise, "System report created!", "Could not create system report.");
    }

    openSupportTicket() {
        var promise = this.http.post(this.openSupportTicketUrl, {}).toPromise().then(
            response => response.json() as any);
        return this.userNotifications.wrapPromise(promise, "Support ticket opened!", "Could not open support ticket.");
    }
}
