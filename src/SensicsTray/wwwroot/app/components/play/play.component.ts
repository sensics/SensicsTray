import { Component, OnInit, OnDestroy } from '@angular/core';
import { OSVRServerService } from '../../services/osvr-server.service';
import { AppSettingsService } from '../../services/app-settings.service';
import { TrackerViewerService } from '../../services/tracker-viewer.service';
import { DirectModeService } from '../../services/direct-mode.service';
import { OSVRConfigService } from '../../services/osvr-config.service';
import { OSVRSampleAppsService } from '../../services/osvr-sample-apps.service';
import { ResetYawService } from '../../services/reset-yaw.service';
import { ISampleApp } from '../../models/osvr-sample-apps.model';
import { Observable, Subscription } from 'rxjs/rx';

@Component({
    moduleId: module.id,
    selector: 'ts-play',
    templateUrl: 'play.html'
})
export class PlayComponent implements OnInit, OnDestroy {
    trackerViewerPath = "";
    threeLetterVendorPNPID = "";
    runningServers: string[] = [];
    showServerRootNotDefined = false;
    serverRoot: string = null;
    sampleApps: ISampleApp[] = null;
    resetYawPath: string = null;

    private serverSubscription: Subscription = null;

    // These will be used in the "Save config as" functionality
    // but I'm having trouble with the HTML sanitizer, so it's disabled
    // for now.
    //configSaveAsURL: string;
    //configSaveAsBlob: Blob;

    constructor(
        private osvrServer: OSVRServerService,
        private trackerViewer: TrackerViewerService,
        private directMode: DirectModeService,
        private osvrConfig: OSVRConfigService,
        private osvrSampleApps: OSVRSampleAppsService,
        private resetYaw: ResetYawService,
        public appSettingsService: AppSettingsService
    ) {
        this.updateRunningServers();

        this.osvrConfig.getCurrentServerRoot().subscribe(
            serverRoot => {
                this.serverRoot = serverRoot;
            },
            error => {
                this.showServerRootNotDefined = true;
            });

        this.osvrSampleApps.getSampleApps().subscribe(
            sampleApps => this.sampleApps = sampleApps);

        // sanitizer is ignoring our bypass, so comment this out for now
        //this.osvrConfig.getCurrent().subscribe(config => {
        //    var json = JSON.stringify(config.body, null, 4);
            //this.configSaveAsBlob = new Blob([json], { type: "application/json" });
            //this.configSaveAsURL = URL.createObjectURL(this.configSaveAsBlob);
            //this.sanitizer.bypassSecurityTrustUrl(this.configSaveAsURL);
        //});
    }

    ngOnInit() {
        this.serverSubscription = this.osvrServer.getRunningServerPaths().subscribe(
            runningServers => {
                this.runningServers = runningServers;
            },
            (error: any) => {
                console.log("PlayComponent: got an error instead of the running servers.");
            });
    }

    ngOnDestroy() {
        if (this.serverSubscription !== null) {
            this.serverSubscription.unsubscribe();
            this.serverSubscription = null;
        }
    }

    private showMsg(msg: string): boolean {
        return typeof msg !== 'undefined' && msg !== null && msg.length > 0;
    }

    showServerRoot() {
        return this.showMsg(this.serverRoot);// && this.showMsg(this.configSaveAsURL);
    }

    updateRunningServers() {
        //this.osvrServer.getRunningServerPaths().subscribe(
        //    servers => {
        //        this.runningServers = servers;
        //    });
    }

    showStartServer() {
        return this.runningServers.length === 0;
    }

    showStopServer() {
        return !this.showStartServer();
    }

    showRestartServer() {
        return this.showStopServer();
    }

    currentlyRunningServer(): string {
        if (this.runningServers.length === 0) {
            return "No OSVR servers running.";
        }

        return this.runningServers.join(";");
    }

    startTrackerViewer() {
        this.trackerViewer.startTrackerViewer(this.trackerViewerPath).subscribe();
    }

    startServer() {
        this.osvrServer.startServer().toPromise().then(_ => {
        });
    }

    stopServer() {
        this.osvrServer.stopServer().toPromise().then(_ => {
        });
    }

    restartServer() {
        this.osvrServer.restartServer().toPromise().then(_ => {
        });
    }

    callResetYaw() {
        this.resetYaw.resetYaw(this.resetYawPath).subscribe();
    }

    enableDirectMode() {
        this.directMode.enableDirectMode(this.threeLetterVendorPNPID).subscribe();
    }

    disableDirectMode() {
        this.directMode.disableDirectMode(this.threeLetterVendorPNPID).subscribe();
    }

    showSampleAppList() {
        return typeof this.sampleApps !== 'undefined' &&
            this.sampleApps !== null;
    }

    launchSampleApp(sampleApp: ISampleApp) {
        this.osvrSampleApps.runSampleApp(sampleApp).subscribe();
    }
}
