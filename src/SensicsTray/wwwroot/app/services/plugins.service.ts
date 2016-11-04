import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import { UserNotificationsService } from './user-notifications.service';

@Injectable()
export class PluginsService {
    downloadPluginsUrl = "/api/downloadPlugins";
    constructor(
        private http: Http,
        private userNotifications: UserNotificationsService) { }

    downloadPlugins(): Promise<any> {
        var promise = this.http.post(this.downloadPluginsUrl, {}).toPromise().then(
            response => response.json() as any);
        return this.userNotifications.wrapPromise(promise, "Plugins downloaded!");
    }
}
