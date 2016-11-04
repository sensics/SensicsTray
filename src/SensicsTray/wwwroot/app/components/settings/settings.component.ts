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
    private config: OSVRConfig.IOSVRConfig = null;

    constructor(
        private osvrConfig: OSVRConfigService,
        private userNotifications: UserNotificationsService) {
        osvrConfig.getCurrent().then(config => {
            this.config = config;
        });
    }

    saveSettings() {
        // "/api/savesettings"
        if (typeof this.config == 'undefined' || this.config == null) {
            this.userNotifications.showError("Could not save current configuration.");
        } else {
            console.log("[STUB] SettingsComponent.saveSettings()");
            this.osvrConfig.setCurrent(this.config);
        }
    }
}
