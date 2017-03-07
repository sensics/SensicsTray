using OSVR.UsbDetection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sensics.Tray.Models
{
    public class UsbDevice
    {
        public UInt16 ProductID;
        public string ProductName;
        public UInt16 VendorID;
        public string VendorName;

        public UsbDevice() { }
        public UsbDevice(UsbDeviceDescriptor usbDeviceDescriptor)
        {
            ProductID = usbDeviceDescriptor.ProductID;
            VendorID = usbDeviceDescriptor.VendorID;
            // @todo: fill in ProductName/VendorName from whitelist?
            ProductName = "Static Placeholder Product Name";
            VendorName = "Static Placeholder Vendor Name";
        }
    }
}
