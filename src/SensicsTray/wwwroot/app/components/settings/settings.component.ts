import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OSVRConfigService } from '../../services/osvr-config.service';
import { UserNotificationsService } from '../../services/user-notifications.service';
import { AppSettingsService } from '../../services/app-settings.service';
import * as OSVRConfig from '../../models/osvr-config.model';

@Component({
    moduleId: module.id,
    selector: 'ts-settings',
    templateUrl: 'settings.html'
})
export class SettingsComponent {
    public configRoot: OSVRConfig.IOSVRConfig = null;
    @ViewChild('settingsForm') settingsForm: NgForm;
    rmConfig: any = null;
    constructor(
        private osvrConfig: OSVRConfigService,
        private userNotifications: UserNotificationsService,
        private appSettings: AppSettingsService) {
        this.refreshConfiguration();
    }

    refreshConfiguration() {
        this.osvrConfig.getCurrent().subscribe(config => {
            var rmConfig: any = null;
            this.configRoot = config;

            // if the current render manager config is a referenced file,
            // replace the renderManagerConfig with the body of the referenced file
            // (we'll only save it if the user makes changes and hits save)
            if (typeof this.configRoot.body.renderManagerConfig === "string" &&
                typeof this.configRoot.includes !== 'undefined' &&
                this.configRoot.includes !== null) {

                for (let i = 0; i < this.configRoot.includes.length; i++) {
                    var inc = this.configRoot.includes[i];
                    if (inc.relativePath === this.configRoot.body.renderManagerConfig) {
                        this.configRoot.body.renderManagerConfig = inc.body;
                        this.configRoot.includes.splice(i, 1);
                        this.rmConfig = inc.body.renderManagerConfig;
                        break;
                    }
                }
            } else if (typeof this.configRoot.body.renderManagerConfig === 'undefined' ||
                this.configRoot.body.renderManagerConfig === null) {
                this.configRoot.body.renderManagerConfig = {
                    renderManagerConfig: {}
                };

                this.rmConfig = this.configRoot.body.renderManagerConfig.renderManagerConfig;
            } else {
                this.rmConfig = this.configRoot.body.renderManagerConfig.renderManagerConfig;
            }
            this.applyTemporaryOverrides();
            //this.settingsForm.reset();
        });
    }

    /**
     * Apply temporary overrides for settings that are not yet shown in the UI.
     */
    applyTemporaryOverrides() {
        // intentionally left blank. do not delete please.
    }

    canSaveSettings() {
        return typeof this.configRoot !== 'undefined' && this.configRoot !== null;
    }

    saveSettings() {
        if (!this.canSaveSettings()) {
            this.userNotifications.showError("Could not save current configuration.");
        } else {
            this.osvrConfig.setCurrent(this.configRoot).toPromise().then(_ => this.refreshConfiguration());
        }
    }

    showSettings() {
        return typeof this.configRoot !== 'undefined' && this.configRoot !== null;
    }
}
