import { Component } from '@angular/core';
import { PluginsService } from '../../services/plugins.service';
import { OSVRConfigService } from '../../services/osvr-config.service';
import { IOSVRConfig } from '../../models/osvr-config.model';
import { Plugin } from '../../models/osvr-plugin.model';

@Component({
    moduleId: module.id,
    selector: 'ts-plugins',
    templateUrl: 'plugins.html'
})
export class PluginsComponent {
    plugins: Plugin[];
    config: IOSVRConfig;
    constructor(private pluginsService: PluginsService, private osvrConfigService: OSVRConfigService) {
        this.downloadPlugins();
    }

    getConfig() {
        return this.osvrConfigService.getCurrent().toPromise().then(config => {
            this.config = config;
            return config;
        });
    }
    downloadPlugins() {
        let configPromise = this.getConfig();
        this.pluginsService.getPluginsPromise().then(result => {
            this.plugins = result;
            return configPromise.then(config => {
                for (var plugin of this.plugins) {
                    if (!plugin.manualLoad) {
                        plugin.enabled = true;
                    } else {
                        plugin.enabled = false;
                        if (typeof config.body.plugins !== 'undefined' && this.config.body.plugins !== null) {
                            for (var enabledPlugin of config.body.plugins) {
                                if (enabledPlugin === plugin.name) {
                                    plugin.enabled = true;
                                }
                            }
                        }
                    }
                }
            });
        });
    }

    saveChanges() {
        this.config.body.plugins = [];
        for (var plugin of this.plugins) {
            if (plugin.manualLoad && plugin.enabled) {
                this.config.body.plugins.push(plugin.name);
            }
        }
        this.osvrConfigService.setCurrent(this.config).toPromise();
    }

    showPluginsList() {
        return typeof this.plugins !== 'undefined' && this.plugins !== null;
    }
}
