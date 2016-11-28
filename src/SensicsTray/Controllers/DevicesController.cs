using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using OSVR.UsbDetection;

namespace TrayApp.Controllers
{
    [Route("api/[controller]")]
    public class DevicesController : Controller
    {
        // GET: api/devices
        [HttpGet]
        public IEnumerable<UsbDeviceDescriptor> Get()
        {
            using (var usbMonitor = new UsbMonitor())
            {
                return usbMonitor.GetDeviceList();
            }
        }
    }
}
