import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserNotificationsService } from '../../services/user-notifications.service';
import { OSVRServerService } from '../../services/osvr-server.service';
import { AppSettingsService } from '../../services/app-settings.service';
import { OSVRConfigService } from '../../services/osvr-config.service';

@Component({
    moduleId: module.id,
    selector: 'ts-app',
    templateUrl: 'app.html'
})
export class AppComponent {
    title = 'Sensics Tray';
    showStatusMessage = false;
    showErrorMessage = false;
    showServerRootNotDefined = false;

    playActive = false;
    storeActive = false;
    devicesActive = false;
    pluginsActive = false;
    settingsActive = false;
    profileActive = false;
    helpActive = false;
    homeActive = false;

    constructor(
        private userNotifications: UserNotificationsService,
        private router: Router,
        private osvrServer: OSVRServerService,
        private osvrConfig: OSVRConfigService,
        public appSettings: AppSettingsService
    ) {
        this.osvrConfig.getCurrentServerRoot().toPromise().then(
            serverRoot => {
                this.showServerRootNotDefined =
                    typeof serverRoot === "undefined" ||
                    serverRoot === null ||
                    serverRoot.length === 0;
            },
            error => {
                this.showServerRootNotDefined = true;
            });

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
                this.homeActive = url === "/home";
            }
        });
    }

    private showMsg(msg: string): boolean {
        return typeof msg !== 'undefined' && msg !== null && msg.length > 0;
    }

    basicButtonColor() {
        return this.appSettings.expertMode ? '#666666' : '#46ddc8';
    }

    expertButtonColor() {
        return this.appSettings.expertMode ? '#46ddc8' : '#666666';
    }

    clickBasic() {
        this.appSettings.expertMode = false;
    }

    clickExpert() {
        this.appSettings.expertMode = true;
    }

    navIconRef(active: boolean, name: string) {
        return `icons/navigation/${active ? 'active' : 'inactive'}/${name}.png`;
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
