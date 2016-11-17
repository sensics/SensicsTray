import { Component } from '@angular/core';
import { OSVRConfigService } from '../../services/osvr-config.service';
import { UserNotificationsService } from '../../services/user-notifications.service';
import * as OSVRConfig from '../../models/osvr-config.model';

@Component({
    moduleId: module.id,
    selector: 'ts-settings',
    templateUrl: 'settings.html'
})
export class SettingsComponent {
    public config: OSVRConfig.IOSVRConfig = null;

    constructor(
        private osvrConfig: OSVRConfigService,
        private userNotifications: UserNotificationsService) {
        osvrConfig.getCurrent().subscribe(config => {
            this.config = config;
        });
    }

    canSaveSettings() {
        return typeof this.config !== 'undefined' && this.config !== null;
    }

    saveSettings() {
        if (!this.canSaveSettings()) {
            this.userNotifications.showError("Could not save current configuration.");
        } else {
            this.osvrConfig.setCurrent(this.config).subscribe();
        }
    }
}
