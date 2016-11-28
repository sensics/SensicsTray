@echo off
pushd %~dp0
cd src\OSVR-USB-Monitor
cmake --version
mkdir build
cd build
set VS=14
set PLATFORM= 2015
cmake .. -G "Visual Studio %VS%%PLATFORM% Win64" "-DCMAKE_INSTALL_PREFIX=..\..\SensicsTray\wwwroot\libs"
popd
pause