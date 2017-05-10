using OSVR.UsbDetection;

namespace Sensics.Tray.Models
{
    public class UsbEvent
    {
        public string StatusCode { get; set; }
        public UsbDeviceDescriptor DeviceDescriptor { get; set; }
    }
}
