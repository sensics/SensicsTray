import { Component } from '@angular/core';
import { UserNotificationsService } from '../../services/user-notifications.service';

@Component({
    moduleId: module.id,
    selector: 'ts-app',
    templateUrl: 'app.html'
})
export class AppComponent {
    title = 'Sensics Tray';
    showNotification = false;
    constructor(private userNotifications: UserNotificationsService) {
        this.userNotifications.getErrorMessages().subscribe(_ => this.showNotification = true);
        this.userNotifications.getStatusMessages().subscribe(_ => this.showNotification = false);
    }

    private showMsg(msg: string): boolean {
        return this.showNotification && typeof msg !== 'undefined' && msg !== null && msg.length > 0;
    }

    statusMessage() {
        return this.userNotifications.getCurrentStatusMessage();
    }

    errorMessage() {
        return this.userNotifications.getCurrentErrorMessage();
    }

    showStatusMessage() {
        return this.showMsg(this.statusMessage());
    }

    showErrorMessage() {
        return this.showMsg(this.errorMessage())
    }

    showMessages() {
        return this.showStatusMessage() || this.showErrorMessage();
    }

    closeNotifications() {
        this.showNotification = false;
    }
}
