// Angular imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

// third party imports
//import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';

// Application component imports
import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { DemoComponent } from './components/demo/demo.component';
import { DevicesComponent } from './components/devices/devices.component';
import { PluginsComponent } from './components/plugins/plugins.component';
import { SettingsComponent } from './components/settings/settings.component';
import { HelpComponent } from './components/help/help.component';

// not yet used
import { ServerRootNotDefinedComponent } from './components/server-root-not-defined/server-root-not-defined.component';

// Application service imports
import { OSVRServerService } from './services/osvr-server.service';
import { TrackerViewerService } from './services/tracker-viewer.service';
import { UserNotificationsService } from './services/user-notifications.service';
import { OSVRConfigService } from './services/osvr-config.service';

@NgModule({
    imports: [ 
        BrowserModule,
        FormsModule,
        HttpModule,
        //Ng2BootstrapModule,
        RouterModule.forRoot([
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'demo',
                component: DemoComponent
            },
            {
                path: 'devices',
                component: DevicesComponent
            },
            {
                path: 'plugins',
                component: PluginsComponent
            },
            {
                path: 'settings',
                component: SettingsComponent
            },
            {
                path: 'help',
                component: HelpComponent
            },
            {
                path: '',
                redirectTo: '/home',
                pathMatch: 'full'
            }
        ])
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        DemoComponent,
        DevicesComponent,
        PluginsComponent,
        HelpComponent,
        SettingsComponent,
        ServerRootNotDefinedComponent // not yet used
    ],
    bootstrap: [ AppComponent ],
    providers: [
        OSVRServerService,
        TrackerViewerService,
        UserNotificationsService,
        OSVRConfigService,
        { provide: LocationStrategy, useClass: HashLocationStrategy}
    ]
})
export class AppModule {
}
