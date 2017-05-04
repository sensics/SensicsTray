using OSVR.UsbDetection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sensics.Tray.Models
{
    internal static class KnownUsbDevices
    {
        static readonly UsbDevice[] knownDevices =
        {
            new UsbDevice()
            {
                ProductID = 0x0b00,
                VendorID = 0x1532,
                ProductName = "OSVR Hacker Dev Kit (version 1.3/1.4/2.0)",
                VendorName = "OSVR",
            },
            new UsbDevice()
            {
                ProductID = 0x2421,
                VendorID = 0x03eb,
                ProductName = "OSVR Hacker Dev Kit",
                VendorName = "OSVR",
            },
            new UsbDevice()
            {
                ProductID = 0x0300,
                VendorID = 0x1532,
                ProductName = "Razer Hydra",
                VendorName = "Razer",
            },
            new UsbDevice()
            {
                ProductID = 0x0001,
                VendorID = 0x2833,
                ProductName = "Laputa VR Hero",
                VendorName = "Laputa VR",
            },
        };

        internal static void FillInInfoFromWhitelist(UsbDevice device)
        {
            var knownDevice = knownDevices.FirstOrDefault(
                d => d.VendorID == device.VendorID && d.ProductID == device.ProductID);

            if(knownDevice != null)
            {
                device.VendorName = knownDevice.VendorName;
                device.ProductName = knownDevice.ProductName;
            }
        }
    }
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
            KnownUsbDevices.FillInInfoFromWhitelist(this);
        }
    }
}
