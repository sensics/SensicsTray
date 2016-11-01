import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'ts-plugins',
    templateUrl: 'plugins.html'
})
export class PluginsComponent {
    downloadPlugins() {
        console.log("[STUB] PluginsComponent.downloadPlugins()");
    }
}
