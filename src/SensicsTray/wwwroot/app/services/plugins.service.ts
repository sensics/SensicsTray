import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { UserNotificationsService } from './user-notifications.service';
import { Plugin } from '../models/osvr-plugin.model';

@Injectable()
export class PluginsService {
    downloadPluginsUrl = "/api/plugins";
    constructor(
        private http: Http,
        private userNotifications: UserNotificationsService) { }

    getPlugins(withManualPlugins: boolean = true, withAutoPlugins: boolean = true): Observable<Plugin[]> {
        let searchParams: URLSearchParams = new URLSearchParams();
        searchParams.set("withManualPlugins", withManualPlugins ? "true" : "false");
        searchParams.set("includeAutoLoadPlugins", withAutoPlugins ? "true" : "false");
        var observable = this.http.get(this.downloadPluginsUrl, { search: searchParams }).map(
            response => response.json() as any);
        return this.userNotifications.wrapObservable(observable, "Plugins downloaded!", "Plugins failed to download.");
    }

    getPluginsPromise(withManualPlugins: boolean = true, withAutoPlugins: boolean = true): Promise<Plugin[]> {
        return this.getPlugins(withManualPlugins, withAutoPlugins).toPromise();
    }
}
