@echo off
pushd %~dp0
cd src\OSVR-USB-Monitor
cmake --version
mkdir build
cd build
set VS=15
set PLATFORM= 2017
cmake .. -G "Visual Studio %VS%%PLATFORM% Win64" "-DCMAKE_INSTALL_PREFIX=..\..\SensicsTray\wwwroot\libs"
popd
pause
