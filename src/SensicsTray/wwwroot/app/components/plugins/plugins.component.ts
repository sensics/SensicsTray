import { Component } from '@angular/core';
import { PluginsService } from '../../services/plugins.service';
import { Plugin } from '../../models/osvr-plugin.model';

@Component({
    moduleId: module.id,
    selector: 'ts-plugins',
    templateUrl: 'plugins.html'
})
export class PluginsComponent {
    plugins: Plugin[];
    constructor(private pluginsService: PluginsService) {
        this.downloadPlugins();
    }

    downloadPlugins() {
        this.pluginsService.getPluginsPromise().then(result => {
            this.plugins = result;
        });
    }
}
