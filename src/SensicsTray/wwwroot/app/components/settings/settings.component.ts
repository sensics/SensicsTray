import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'ts-settings',
    templateUrl: 'settings.html'
})
export class SettingsComponent {
    saveSettings() {
        // "/api/savesettings"
        console.log("[STUB] SettingsComponent.saveSettings()");
    }
}
