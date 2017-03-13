using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using OSVR.UsbDetection;
using Sensics.Tray.Models;

namespace TrayApp.Controllers
{
    [Route("api/[controller]")]
    public class DevicesController : Controller
    {
        // GET: api/devices
        [HttpGet]
        public IEnumerable<UsbDevice> Get()
        {
            using (var usbMonitor = new UsbMonitor())
            {
                return from usbDeviceDescriptor in usbMonitor.GetDeviceList()
                       select new UsbDevice(usbDeviceDescriptor);
            }
        }
    }
}
