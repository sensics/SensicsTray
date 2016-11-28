using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;

namespace OSVR.UsbDetection
{
    public enum UsbStatusCode
    {
        NoStatusChange,
        DeviceAdded,
        DeviceRemoved,
    }

    internal static class UsbReturnCode
    {
        // @todo: we can remove these if IsSuccess can call a native method
        // for its implementation
        private static sbyte Success { get { return 0; } }
        private static sbyte Failure { get { return 1; } }

        public static bool IsSuccess(sbyte returnCode)
        {
            // @todo Add a native method that implements this.
            // Then we can remove the hard-coded values above
            return returnCode == Success;
        }
    }

    [StructLayout(LayoutKind.Sequential)]
    public struct UsbDeviceDescriptor
    {
        public UInt16 ProductID;
        public UInt16 VendorID;
    }

    [UnmanagedFunctionPointer(CallingConvention.Cdecl)]
    internal delegate void UsbDeviceAddedCallbackNative(
        IntPtr /* void* */ userData, ref UsbDeviceDescriptor device);

    [UnmanagedFunctionPointer(CallingConvention.Cdecl)]
    internal delegate void UsbDeviceRemovedCallbackNative(
        IntPtr /* void* */ userData, ref UsbDeviceDescriptor device);

    
    internal static class UsbMonitorNative
    {
        private const string OSVRUsbDetectionLibName = "osvrUSBDetection";

        [DllImport(OSVRUsbDetectionLibName, CallingConvention = CallingConvention.Cdecl)]
        public static extern IntPtr osvrUSBDetectionMonitorInit();

        [DllImport(OSVRUsbDetectionLibName, CallingConvention = CallingConvention.Cdecl)]
        public static extern void osvrUSBDetectionMonitorShutdown(IntPtr monitor);

        [DllImport(OSVRUsbDetectionLibName, CallingConvention = CallingConvention.Cdecl)]
        public static extern void osvrUSBDetectionStartMonitor(IntPtr monitor);

        [DllImport(OSVRUsbDetectionLibName, CallingConvention = CallingConvention.Cdecl)]
        public static extern sbyte osvrUSBDetectionStopMonitor(IntPtr monitor);

        [DllImport(OSVRUsbDetectionLibName, CallingConvention = CallingConvention.Cdecl)]
        public static extern UsbStatusCode osvrUSBDetectionMonitorUpdate(IntPtr monitor, ref UsbDeviceDescriptor dev);

        [DllImport(OSVRUsbDetectionLibName, CallingConvention = CallingConvention.Cdecl)]
        public static extern uint osvrUSBDetectionGetDeviceList(IntPtr monitor, ref IntPtr list);

        [DllImport(OSVRUsbDetectionLibName, CallingConvention = CallingConvention.Cdecl)]
        public static extern void osvrUSBDetectionFreeDeviceList(IntPtr list, uint numDevices);

        [DllImport(OSVRUsbDetectionLibName, CallingConvention = CallingConvention.Cdecl)]
        public static extern sbyte osvrUSBDetectionRegisterDeviceAddedCallback(IntPtr monitor, UsbDeviceAddedCallbackNative cb, IntPtr userData);

        [DllImport(OSVRUsbDetectionLibName, CallingConvention = CallingConvention.Cdecl)]
        public static extern sbyte osvrUSBDetectionRegisterDeviceRemovedCallback(IntPtr monitor, UsbDeviceRemovedCallbackNative cb, IntPtr userData);
    }

    public class UsbMonitor : IDisposable
    {
        private IntPtr monitor = IntPtr.Zero;

        /// <summary>
        /// Initializes USB monitor. There are two modes : blocking and
        /// non-blocking.Use 0 for non-blocking and 1 for blocking monitor
        /// </summary>
        public UsbMonitor()
        {
            monitor = UsbMonitorNative.osvrUSBDetectionMonitorInit();
            if(monitor == IntPtr.Zero)
            {
                throw new Exception(
                    "Native osvrUSBDetectionMonitorInit returned an invalid device monitor handle.");
            }

            // @todo make this callback registration lazy on the first subscription to DeviceAdded
            if(!UsbReturnCode.IsSuccess(
                UsbMonitorNative.osvrUSBDetectionRegisterDeviceAddedCallback(monitor, DeviceAddedHandler, IntPtr.Zero)))
            {
                throw new Exception(
                    "Couldn't register a device added callback.");
            }

            // @todo make this callback registration lazy on the first subscription to DeviceRemoved
            if(!UsbReturnCode.IsSuccess(
                UsbMonitorNative.osvrUSBDetectionRegisterDeviceRemovedCallback(monitor, DeviceRemovedHandler, IntPtr.Zero)))
            {
                throw new Exception(
                    "Couldn't register a device removed callback.");
            }
        }

        public event EventHandler<UsbDeviceDescriptor> DeviceAdded;
        private void DeviceAddedHandler(IntPtr userData, ref UsbDeviceDescriptor deviceDescriptor)
        {
            // Adapt native callback to managed
            if(DeviceAdded != null)
            {
                DeviceAdded(this, deviceDescriptor);
            }
        }

        public event EventHandler<UsbDeviceDescriptor> DeviceRemoved;
        private void DeviceRemovedHandler(IntPtr userData, ref UsbDeviceDescriptor deviceDescriptor)
        {
            // Adapt native callback to managed
            if(DeviceRemoved != null)
            {
                DeviceRemoved(this, deviceDescriptor);
            }
        }

        /// <summary>
        /// Starts a blocking monitoring for USB events. For non-blocking, you
        /// need to use osvrUSBDetectionMonitorUpdate.
        /// </summary>
        public void Start()
        {
            // @todo create a thread to run this in, and marshall callbacks to this thread.
            UsbMonitorNative.osvrUSBDetectionStartMonitor(monitor);
        }

        /// <summary>
        /// Shuts down USB Monitor and destroys the associated object and pointer
        /// </summary>
        /// <returns></returns>
        public bool Stop()
        {
            var ret = UsbReturnCode.IsSuccess(
                UsbMonitorNative.osvrUSBDetectionStopMonitor(monitor));
            // @todo - do we set monitor to IntPtr.Zero here? Check the native code.
            return ret;
        }

        /// <summary>
        /// Checks if there is a USB event and will save info to device descriptor.
        /// If such an event occurs, its status code will tell you if device has been
        /// added/removed or no change.
        /// </summary>
        /// <param name="deviceDescriptor">If Update returns UsbStatusCode.DeviceAdded or 
        /// UsbStatusCode.DeviceRemoved, will assign this parameter to the added or
        /// removed device descriptor. Otherwise it will not be changed.</param>
        /// <returns>True if a new device descriptor was available.</returns>
        public UsbStatusCode Update(ref UsbDeviceDescriptor deviceDescriptor)
        {
            return UsbMonitorNative.osvrUSBDetectionMonitorUpdate(monitor, ref deviceDescriptor);
        }

        public IList<UsbDeviceDescriptor> GetDeviceList()
        {
            List<UsbDeviceDescriptor> ret = new List<UsbDeviceDescriptor>();
            IntPtr list = IntPtr.Zero;
            var size = UsbMonitorNative.osvrUSBDetectionGetDeviceList(monitor, ref list);
            var ptr = list;
            var structSize = Marshal.SizeOf<UsbDeviceDescriptor>();
            try
            {
                for (uint i = 0; i < size; i++)
                {
                    ret.Add(Marshal.PtrToStructure<UsbDeviceDescriptor>(ptr));
                    ptr = (ptr + structSize);
                }
            }
            finally
            {
                UsbMonitorNative.osvrUSBDetectionFreeDeviceList(list, size);
            }
            return ret;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                // should always be true - constructor throws otherwise
                if (monitor != IntPtr.Zero)
                {
                    UsbMonitorNative.osvrUSBDetectionMonitorShutdown(monitor);
                }
            }
        }
    }
}
