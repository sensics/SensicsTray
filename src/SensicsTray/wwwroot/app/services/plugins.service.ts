import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { UserNotificationsService } from './user-notifications.service';

@Injectable()
export class PluginsService {
    downloadPluginsUrl = "/api/downloadPlugins";
    constructor(
        private http: Http,
        private userNotifications: UserNotificationsService) { }

    downloadPlugins(): Observable<any> {
        var observable = this.http.post(this.downloadPluginsUrl, {}).map(
            response => response.json() as any);
        return this.userNotifications.wrapObservable(observable, "Plugins downloaded!", "Plugins failed to download.");
    }
}
