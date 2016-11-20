using System;


namespace TrayApp.Devices
{
    public class USBDevice
    {
        public USBDevice(uint vendorID, uint productID)
        {
            this.VendorID = vendorID;
            this.ProductID = productID;
        }
        public USBDevice() { }
        
        public uint VendorID { get; set; }
        public uint ProductID { get; set; }
    }

    public enum EventCode { USB_DEVICE_NO_STATUS_CHANGE, USB_DEVICE_ADDED, USB_DEVICE_REMOVED};

    public class USBEvent
    {
        public USBEvent(EventCode eventCode, USBDevice dev) {
            this.USBDeviceEvent = eventCode;
            this.Device = dev;
        }

        public USBDevice Device;
        public EventCode USBDeviceEvent;
    }
}