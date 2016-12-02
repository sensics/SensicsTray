import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserNotificationsService } from '../../services/user-notifications.service';
import { OSVRServerService } from '../../services/osvr-server.service';

@Component({
    moduleId: module.id,
    selector: 'ts-app',
    templateUrl: 'app.html'
})
export class AppComponent {
    title = 'Sensics Tray';
    showStatusMessage = false;
    showErrorMessage = false;
    constructor(
        private userNotifications: UserNotificationsService,
        private router: Router,
        private osvrServer: OSVRServerService
    ) {
        this.userNotifications.getErrorMessages().subscribe(_ => {
            this.showErrorMessage = this.showMsg(this.userNotifications.getCurrentErrorMessage());
            this.showStatusMessage = false;
        });

        this.userNotifications.getStatusMessages().subscribe(_ => {
            this.showStatusMessage = this.showMsg(this.userNotifications.getCurrentStatusMessage());
            this.showErrorMessage = false;
        });
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.closeNotifications();
            }
        });
    }

    private showMsg(msg: string): boolean {
        return typeof msg !== 'undefined' && msg !== null && msg.length > 0;
    }

    showSuggestRestart() {
        return this.osvrServer.getSuggestServerRestart();
    }

    closeSuggestRestart() {
        this.osvrServer.setSuggestServerRestart(false);
    }

    restartServer() {
        this.osvrServer.restartServer();
    }

    statusMessage() {
        return this.userNotifications.getCurrentStatusMessage();
    }

    errorMessage() {
        return this.userNotifications.getCurrentErrorMessage();
    }

    showMessages() {
        return this.showStatusMessage || this.showErrorMessage;
    }

    closeNotifications() {
        this.showStatusMessage = this.showErrorMessage = false;
    }
}
