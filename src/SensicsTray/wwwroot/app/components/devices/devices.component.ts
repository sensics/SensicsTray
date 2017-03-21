import { Component, OnInit, OnDestroy } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/rx';
import { DevicesService } from '../../services/devices.service';
import { OSVRConfigService } from '../../services/osvr-config.service';
import { Observable } from 'rxjs/Rx';
import { ChangeDetectionStrategy } from '@angular/core';
import { IOSVRSampleConfig } from '../../models/osvr-config.model';
import { IUSBDevice } from '../../models/usb-devices.model';
import { ViewConfigDialogComponent } from './view-config-dialog.component';


@Component({
    moduleId: module.id,
    selector: 'ts-devices',
    templateUrl: 'devices.html'
})
export class DevicesComponent implements OnInit, OnDestroy {
    constructor(
        private dialog: MdDialog,
        private devService: DevicesService,
        private osvrConfig: OSVRConfigService
    ) { }

    private usbEventSubscription: Subscription = null;
    private usbDevices: IUSBDevice[];
    private sampleConfigs: IOSVRSampleConfig[];

    ngOnInit() {
        this.refreshDevicesList();

        // @todo: implement a retry in case of failure? Currently this observable
        // stops on the first failed request, which may not be what we want.
        this.usbEventSubscription = this.devService.getUSBEevent().subscribe(
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

    ngOnDestroy() {
        // this is a polling observable, so it keeps going unless
        // we unsubscribe or there's an error.
        if (typeof this.usbEventSubscription !== null) {
            this.usbEventSubscription.unsubscribe();
            this.usbEventSubscription = null;
        }
    }

    asHex(value: number) {
        return ("0000" + value.toString(16)).substr(-4);
    }

    vendorIDOrName(usbDevice: IUSBDevice) {
        if (typeof usbDevice.vendorName === "string" && usbDevice.vendorName.length > 0) {
            return `(${this.asHex(usbDevice.vendorID)}) - ${usbDevice.vendorName}`;
        }
        return this.asHex(usbDevice.vendorID);
    }

    productIDOrName(usbDevice: IUSBDevice) {
        if (typeof usbDevice.productName === "string" && usbDevice.productName.length > 0) {
            return `(${this.asHex(usbDevice.productID)}) - ${usbDevice.productName}`;
        }
        return this.asHex(usbDevice.productID);
    }

    refreshDevicesList() {
        this.devService.getDevices().subscribe(
            devices => this.usbDevices = devices);
    }
    clickSampleConfig(sampleConfig: IOSVRSampleConfig) {
        this.osvrConfig.setCurrent(sampleConfig.body).subscribe();
    }

    viewSampleConfig(sampleConfig: IOSVRSampleConfig) {
        let dialogRef = this.dialog.open(ViewConfigDialogComponent, {
            data: sampleConfig,
            height: "600",
            width: "600"
        });
    }
}
