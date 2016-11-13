using System;
using System.Collections.Generic;
using System.Management;
using Microsoft.AspNetCore.Mvc;
using TrayApp.Devices;
namespace TrayApp.Controllers
{
    
    [Route("api/[controller]")]
    public class DevicesController : Controller
    {
              
        // GET: api/getusbdevices
        [HttpGet]
        public IEnumerable<OSVRDevice> Get()
        {
            List<OSVRDevice> devices = new List<OSVRDevice>();
            ManagementObjectCollection collection;
            using (var searcher = new ManagementObjectSearcher(@"Select * From Win32_USBHub"))
            collection = searcher.Get();      

            foreach (var device in collection)
            {
                devices.Add(new OSVRDevice(
                (string)device.GetPropertyValue("DeviceID"),
                (string)device.GetPropertyValue("PNPDeviceID"),
                (string)device.GetPropertyValue("Description"),
                (string)device.GetPropertyValue("Name"),
                (string)device.GetPropertyValue("Manufacturer")
                ));
            }

            collection.Dispose();
            return devices;
        }
    }
    
}