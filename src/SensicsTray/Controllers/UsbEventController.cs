using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OSVR.UsbDetection;
using Sensics.Tray.Models;

namespace Sensics.Tray.Controllers
{
    [Route("api/[controller]")]
    public class UsbEventController : Controller
    {
        // GET: api/usbevent
        [HttpGet]
        public UsbEvent GetUsbEvent()
        {
            using (var usbMonitor = new UsbMonitor())
            {
                UsbDeviceDescriptor deviceDescriptor = new UsbDeviceDescriptor();
                var statusCode = usbMonitor.Update(ref deviceDescriptor);
                return new UsbEvent()
                {
                    DeviceDescriptor = deviceDescriptor,
                    StatusCode = Enum.GetName(statusCode.GetType(), statusCode),
                };
            }
            //Console.WriteLine("GetUSBEvent\n");
            //IntPtr usbMonitor = osvrUSBDetectionMonitorInit();
            //OSVR_USBDeviceDescriptor devDesc = new OSVR_USBDeviceDescriptor();
            //EventCode eventCode = (EventCode)osvrUSBDetectionMonitorUpdate(usbMonitor, ref devDesc);
            //USBDevice dev = new USBDevice(devDesc.vendorID, devDesc.productID);
            //USBEvent deviceEvent = new USBEvent(eventCode, dev);

            //if (eventCode == EventCode.USB_DEVICE_NO_STATUS_CHANGE)
            //{
            //    Console.WriteLine("GetUSBEvent: No status change\n");
            //}
            //else if (eventCode == EventCode.USB_DEVICE_ADDED)
            //{
            //    Console.WriteLine("GetUSBEvent: Device added\n");
            //}
            //else if (eventCode == EventCode.USB_DEVICE_REMOVED)
            //{
            //    Console.WriteLine("GetUSBEvent: Device removed\n");
            //}
            //else
            //{
            //    Console.WriteLine("Got an event code that is not recognized\n");
            //}
            //osvrUSBDetectionMonitorShutdown(usbMonitor);
            //Console.WriteLine("GetUSBDevices : Monitor shutdown, returning");
            //return deviceEvent;
        }
    }
}
