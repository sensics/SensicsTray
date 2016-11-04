import { Component } from '@angular/core';
import { PluginsService } from '../../services/plugins.service';

@Component({
    moduleId: module.id,
    selector: 'ts-plugins',
    templateUrl: 'plugins.html'
})
export class PluginsComponent {
    constructor(private plugins: PluginsService) { }
    downloadPlugins() {
        this.plugins.downloadPlugins();
    }
}
