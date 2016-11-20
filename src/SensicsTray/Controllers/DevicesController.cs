using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.InteropServices;
using TrayApp.Devices;
namespace TrayApp.Controllers
{

    [StructLayout(LayoutKind.Sequential)]
    public struct OSVR_USBDeviceDescriptor
    {
        public UInt16 productID;
        public UInt16 vendorID;
    }


    [Route("api/[controller]")]
    public class DevicesController : Controller
    {

        [DllImport("osvrUSBDetection", CallingConvention = CallingConvention.Cdecl)]
        private static extern IntPtr osvrUSBDetectionMonitorInit();

        [DllImport("osvrUSBDetection", CallingConvention = CallingConvention.Cdecl)]
        private static extern void osvrUSBDetectionStartMonitor(IntPtr monitor);

        [DllImport("osvrUSBDetection", CallingConvention = CallingConvention.Cdecl)]
        private static extern sbyte osvrUSBDetectionStopMonitor(IntPtr monitor);

        [DllImport("osvrUSBDetection", CallingConvention = CallingConvention.Cdecl)]
        private static extern int osvrUSBDetectionMonitorUpdate(IntPtr monitor, ref OSVR_USBDeviceDescriptor dev);

        [DllImport("osvrUSBDetection", CallingConvention = CallingConvention.Cdecl)]
        private static extern void osvrUSBDetectionMonitorShutdown(IntPtr monitor);

        [DllImport("osvrUSBDetection", CallingConvention = CallingConvention.Cdecl)]
        private static extern uint osvrUSBDetectionGetDeviceList(IntPtr monitor, ref OSVR_USBDeviceDescriptor[] list);

        [DllImport("osvrUSBDetection", CallingConvention = CallingConvention.Cdecl)]
        private static extern void osvrUSBDetectionFreeDeviceList(OSVR_USBDeviceDescriptor[] list, uint numDevices);

        // GET: api/GetUSBDevices
        [HttpGet]
        public IEnumerable<USBDevice> GetUSBDevices()
        {
            Console.WriteLine("GetUSBDevices\n");
            List<USBDevice> devices = new List<USBDevice>();

            IntPtr usbMonitor = osvrUSBDetectionMonitorInit();
            OSVR_USBDeviceDescriptor[] devList = null;
            uint numDevices = osvrUSBDetectionGetDeviceList(usbMonitor, ref devList);
            Console.WriteLine("GetUSBDevices : Got {0} number of conncted devices\n", numDevices);
            for (int i = 0; i < numDevices; i++) {
                USBDevice dev = new USBDevice(devList[i].vendorID, devList[i].productID);
                Console.WriteLine("GetUSBDevices : Adding devices with VID:{0} and PID:{0}\n", dev.VendorID, dev.ProductID);
                devices.Add(dev);
            }
            osvrUSBDetectionMonitorShutdown(usbMonitor);
            Console.WriteLine("GetUSBDevices : Monitor shutdown, returning");
            return devices;
        }

        // GET: api/GetUSBEvent
        [HttpGet]
        public USBEvent GetUSBEvent()
        {
            Console.WriteLine("GetUSBEvent\n");
            IntPtr usbMonitor = osvrUSBDetectionMonitorInit();
            OSVR_USBDeviceDescriptor devDesc = new OSVR_USBDeviceDescriptor();
            EventCode eventCode = (EventCode) osvrUSBDetectionMonitorUpdate(usbMonitor, ref devDesc);
            USBDevice dev = new USBDevice(devDesc.vendorID, devDesc.productID);
            USBEvent deviceEvent = new USBEvent(eventCode, dev);

            if (eventCode == EventCode.USB_DEVICE_NO_STATUS_CHANGE)
            {
                Console.WriteLine("GetUSBEvent: No status change\n");
            }
            else if(eventCode == EventCode.USB_DEVICE_ADDED)
            {
                Console.WriteLine("GetUSBEvent: Device added\n");
            }
            else if(eventCode == EventCode.USB_DEVICE_REMOVED) 
            {
                Console.WriteLine("GetUSBEvent: Device removed\n");
            }
            else {
                Console.WriteLine("Got an event code that is not recognized\n");
            }
            osvrUSBDetectionMonitorShutdown(usbMonitor);
            Console.WriteLine("GetUSBDevices : Monitor shutdown, returning");
            return deviceEvent;
        }
        
    }

}