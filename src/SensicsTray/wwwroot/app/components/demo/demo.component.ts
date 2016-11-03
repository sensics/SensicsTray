import { Component } from '@angular/core';
import { OSVRServerService } from '../../services/osvr-server.service';
import { TrackerViewerService } from '../../services/tracker-viewer.service';

@Component({
    moduleId: module.id,
    selector: 'ts-demo',
    templateUrl: 'demo.html'
})
export class DemoComponent {
    trackerViewerPath = "";

    constructor(private osvrServer: OSVRServerService, private trackerViewer: TrackerViewerService) { }

    startTrackerViewer() {
        this.trackerViewer.startTrackerViewer(this.trackerViewerPath);
    }

    startServer() {
        this.osvrServer.startServer();
    }
}
