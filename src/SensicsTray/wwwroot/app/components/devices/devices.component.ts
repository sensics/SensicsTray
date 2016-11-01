import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'ts-devices',
    templateUrl: 'devices.html'
})
export class DevicesComponent {
    startDeviceMonitor() {
        // "/api/startdevmonitor"
        console.log("[STUB] DevicesComponent.startDeviceMonitor()");
    }
}
