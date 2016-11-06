import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { DevicesService } from '../../services/devices.service';

export interface IOSVRDevice {
    id: number;
    path: string;
    vid: string;
    pid: string;
    friendlyName: string;
    modelName: string;
    vendorName: string;
    version: string;
    deviceType: string;
    enabled: boolean;
}

@Component({
    moduleId: module.id,
    selector: 'ts-devices',
    templateUrl: 'devices.html'
})
export class DevicesComponent implements OnInit {
    constructor(private devService: DevicesService) { }
    //startDeviceMonitor() {
    //    this.devService.startDeviceMonitor();
    //}

    private usbDevices: IOSVRDevice[];

    ngOnInit() {
        this.devService.getDevices().subscribe(
            (response: Response) => {
                console.log("Received devices");
                this.usbDevices = response.json();
            },
            (error: any) => {
                console.log("Got an error");
            });
    }
}
