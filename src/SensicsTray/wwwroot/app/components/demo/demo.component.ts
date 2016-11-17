import { Component } from '@angular/core';
import { OSVRServerService } from '../../services/osvr-server.service';
import { TrackerViewerService } from '../../services/tracker-viewer.service';
import { DirectModeService } from '../../services/direct-mode.service';

@Component({
    moduleId: module.id,
    selector: 'ts-demo',
    templateUrl: 'demo.html'
})
export class DemoComponent {
    trackerViewerPath = "";
    threeLetterVendorPNPID = "";

    constructor(
        private osvrServer: OSVRServerService,
        private trackerViewer: TrackerViewerService,
        private directMode: DirectModeService)
    { }

    startTrackerViewer() {
        this.trackerViewer.startTrackerViewer(this.trackerViewerPath);
    }

    startServer() {
        this.osvrServer.startServer();
    }

    enableDirectMode() {
        this.directMode.enableDirectMode(this.threeLetterVendorPNPID);
    }

    disableDirectMode() {
        this.directMode.disableDirectMode(this.threeLetterVendorPNPID);
    }
}
