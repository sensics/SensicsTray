using System;


namespace TrayApp.Devices
{
    public class OSVRDevice
    {
        public OSVRDevice(string deviceID, string pnpDeviceID, string description, string name, name manufacturer)
        {
            this.DeviceID = deviceID;
            this.PnpDeviceID = pnpDeviceID;
            this.Description = description;
            this.Name = name;
            this.Manufacturer = manufacturer;
        }
        
        public string DeviceID {get; set;}
        public string PnpDeviceID {get; set;}
        public string Description {get; set;}
        public string Name {get; set;}
        public string Manufacturer {get; set;}
    }
}