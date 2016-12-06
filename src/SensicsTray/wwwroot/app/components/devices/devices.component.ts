import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { DevicesService } from '../../services/devices.service';
import { OSVRConfigService } from '../../services/osvr-config.service';
import { Observable } from 'rxjs/Rx';
import { ChangeDetectionStrategy } from '@angular/core';
import { IOSVRSampleConfig } from '../../models/osvr-config.model';
import { IUSBDevice } from '../../models/usb-devices.model';

@Component({
    moduleId: module.id,
    selector: 'ts-devices',
    templateUrl: 'devices.html'
})
export class DevicesComponent implements OnInit {
    constructor(
        private devService: DevicesService,
        private osvrConfig: OSVRConfigService
    ) { }

    private usbDevices: IUSBDevice[];
    private sampleConfigs: IOSVRSampleConfig[];

    ngOnInit() {
        this.refreshDevicesList();

        this.devService.getUSBEevent().subscribe(
            event => {
                if (event.statusCode !== "NoStatusChange") {
                    this.refreshDevicesList();
                }
            },
            (error: any) => {
                console.log("DevicesComponent: Got an error instead of event")
            });

        this.osvrConfig.getSampleConfigs().subscribe(
            configs => this.sampleConfigs = configs);
    }

    refreshDevicesList() {
        this.devService.getDevices().subscribe(
            devices => this.usbDevices = devices);
    }
    clickSampleConfig(sampleConfig: IOSVRSampleConfig) {
        this.osvrConfig.setCurrent(sampleConfig.body).subscribe();
    }

    viewSampleConfig(sampleConfig: IOSVRSampleConfig) {
        for (let i = 0; i < this.sampleConfigs.length; i++) {
            this.sampleConfigs[i].showDetail = false;
        }
        sampleConfig.showDetail = true;
    }
}
