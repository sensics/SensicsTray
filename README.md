# SensicsTray
SensicsTray is a companion application for OSVR and Sensics Home. It allows you to start/stop the OSVR server, configure rendering settings, switch from different configuration presets, and run sample applications.

# Build Requirements
 * NodeJS
 * .NET Core (1.6)
 * Wix (optional, to build the Setup installer)

# Build instructions
 * Make sure you run git submodule update --init --recursive to download dependencies.
 * run configure_usb_lib.cmd to run cmake on the native USB library.
 * Run build_release.cmd to build the rest of the application. If running for the first time, this may take longer to download dependencies.
 * Output is in /src/electron-app/dist.

# Setup
 * If you have Wix installed, you can build the installer. Just build the Setup project in the solution.