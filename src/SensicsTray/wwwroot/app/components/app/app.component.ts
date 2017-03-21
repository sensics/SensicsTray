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

    playActive = false;
    storeActive = false;
    devicesActive = false;
    pluginsActive = false;
    settingsActive = false;
    profileActive = false;
    helpActive = false;

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
                var url = event.urlAfterRedirects;
                this.closeNotifications();
                this.helpActive = url === "/help";
                this.storeActive = url === "/store";
                this.profileActive = url === "/profile";
                this.settingsActive = url === "/settings";
                this.pluginsActive = url === "/plugins";
                this.devicesActive = url === "/devices";
                this.playActive = url === "/play";
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
        this.osvrServer.restartServer().subscribe();
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
