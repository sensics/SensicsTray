export interface IUSBDevice {
    vendorID: number;
    vendorName: string;
    productID: number;
    productName: string;
    modelName: string;
    firmwareVersion: string;
    deviceType: string;
    enabled: boolean;
}

export interface IUSBEvent {
    statusCode: string;
    deviceDescriptor: IUSBDevice;
}
