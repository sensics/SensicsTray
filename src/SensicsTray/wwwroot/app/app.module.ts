// Angular imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MaterialModule, MdIconModule, MdIconRegistry, MdDialogModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

// third party imports
//import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';

// Application component imports
import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { PlayComponent } from './components/play/play.component';
import { DevicesComponent } from './components/devices/devices.component';
import { PluginsComponent } from './components/plugins/plugins.component';
import { SettingsComponent } from './components/settings/settings.component';
import { HelpComponent } from './components/help/help.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StoreComponent } from './components/store/store.component';
import { ViewConfigDialogComponent } from './components/devices/view-config-dialog.component';

// not yet used
import { ServerRootNotDefinedComponent } from './components/server-root-not-defined/server-root-not-defined.component';

// Application service imports
import { OSVRServerService } from './services/osvr-server.service';
import { TrackerViewerService } from './services/tracker-viewer.service';
import { UserNotificationsService } from './services/user-notifications.service';
import { OSVRConfigService } from './services/osvr-config.service';
import { OSVRSampleAppsService } from './services/osvr-sample-apps.service';
import { PluginsService } from './services/plugins.service';
import { HelpService } from './services/help.service';
import { DevicesService } from './services/devices.service';
import { DirectModeService } from './services/direct-mode.service';
import { ResetYawService } from './services/reset-yaw.service';
import { AppSettingsService } from './services/app-settings.service';

@NgModule({
    entryComponents: [
        ViewConfigDialogComponent
    ],
    imports: [ 
        BrowserModule,
        FormsModule,
        HttpModule,
        MdIconModule.forRoot(),
        MaterialModule.forRoot(),
        FlexLayoutModule.forRoot(),
        MdDialogModule.forRoot(),
        //Ng2BootstrapModule,
        RouterModule.forRoot([
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'store',
                component: StoreComponent
            },
            {
                path: 'play',
                component: PlayComponent
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
                path: 'profile',
                component: ProfileComponent
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
        PlayComponent,
        DevicesComponent,
        PluginsComponent,
        HelpComponent,
        ProfileComponent,
        SettingsComponent,
        StoreComponent,
        ViewConfigDialogComponent,
        ServerRootNotDefinedComponent // not yet used
    ],
    bootstrap: [ AppComponent ],
    providers: [
        OSVRServerService,
        AppSettingsService,
        TrackerViewerService,
        UserNotificationsService,
        OSVRConfigService,
        OSVRSampleAppsService,
        PluginsService,
        HelpService,
        DevicesService,
        DirectModeService,
        ResetYawService,
        MdIconRegistry,
        { provide: LocationStrategy, useClass: HashLocationStrategy}
    ]
})
export class AppModule {
}
