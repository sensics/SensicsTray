// Angular imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
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

@NgModule({
    imports: [ 
        BrowserModule,
        FormsModule,
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
        SettingsComponent
    ],
    bootstrap: [ AppComponent ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy}
    ]
})
export class AppModule {
}
