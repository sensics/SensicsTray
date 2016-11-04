import { Component } from '@angular/core';
import { DevicesService } from '../../services/devices.service';

@Component({
    moduleId: module.id,
    selector: 'ts-devices',
    templateUrl: 'devices.html'
})
export class DevicesComponent {
    constructor(private devices: DevicesService) { }
    startDeviceMonitor() {
        this.devices.startDeviceMonitor();
    }
}
