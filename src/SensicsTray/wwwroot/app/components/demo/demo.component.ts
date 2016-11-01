import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'ts-demo',
    templateUrl: 'demo.html'
})
export class DemoComponent {
    trackerViewerPath = "";

    startTrackerViewer() {
        var paths = (typeof this.trackerViewerPath !== "undefined" && this.trackerViewerPath !== null) ?
            this.trackerViewerPath.split(" ") : [];

        console.log("[STUB] DemoComponent.startTrackerViewer(), paths: " + paths.join(","));
    }

    startServer() {
        console.log("[STUB] DemoComponent.startServer()");
    }
}
