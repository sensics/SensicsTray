import { Injectable } from "@angular/core"
import { UserNotificationsService } from './user-notifications.service';

@Injectable()
export class OSVRServerService {
    constructor(private userNotifications: UserNotificationsService) { }

    startServer(): Promise<void> {
        return this.userNotifications.wrapPromise(Promise.resolve(),
            "OSVRServerService.startServer() - success!");
    }

    stopServer(): Promise<void> {
        return this.userNotifications.wrapPromise(Promise.resolve(),
            "OSVRServerService.stopServer() - success!");
    }
}
