import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { DevicesService } from '../../services/devices.service';
import { Observable } from 'rxjs/Rx';
import { ChangeDetectionStrategy } from '@angular/core';

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

    private usbDevices: IOSVRDevice[];

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
    }


}
