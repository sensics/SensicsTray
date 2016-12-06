export interface IUSBDevice {
    vendorID: string;
    productID: string;
    friendlyName: string;
    modelName: string;
    vendorName: string;
    firmwareVersion: string;
    deviceType: string;
    enabled: boolean;
}

export interface IUSBEvent {
    statusCode: string;
    deviceDescriptor: IUSBDevice;
}
