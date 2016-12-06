import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { DevicesService } from '../../services/devices.service';
import { OSVRConfigService } from '../../services/osvr-config.service';
import { Observable } from 'rxjs/Rx';
import { ChangeDetectionStrategy } from '@angular/core';
import { IOSVRSampleConfig } from '../../models/osvr-config.model';

export interface IOSVRDevice {
    vendorID: string;
    productID: string;
    friendlyName: string;
    modelName: string;
    vendorName: string;
    firmwareVersion: string;
    deviceType: string;
    enabled: boolean;
}

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

    private usbDevices: IOSVRDevice[];
    private sampleConfigs: IOSVRSampleConfig[];

    ngOnInit() {
        this.devService.getDevices().subscribe(
            (response: Response) => {
                console.log("DevicesComponent: Received devices");
                this.usbDevices = response.json();
            },
            (error: any) => {
                console.log("DevicesComponent: Got an error instead of device list");
            });

        this.devService.getUSBEevent().subscribe(
            (response: Response) => {
                console.log("DevicesComponent: Received new event");
            },
            (error: any) => {
                console.log("DevicesComponent: Got an error instead of event")
            });

        this.osvrConfig.getSampleConfigs().subscribe(
            configs => this.sampleConfigs = configs);
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
