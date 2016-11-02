setlocal
set DOTNET_CLI_TELEMETRY_OPTOUT=1
pushd "%~dp0"
cd src\electron-app
call npm install
cd app
call npm install
popd
pushd "%~dp0"
cd src\SensicsTray
@rem DNU is a batch file, so have to use call or we never return from this
call dotnet restore
call dotnet publish -o artifacts\bin --configuration Release
xcopy artifacts\bin ..\electron-app\app\bin\ /Y /E
popd
pushd "%~dp0"
cd src/electron-app
call gulp
popd
endlocal