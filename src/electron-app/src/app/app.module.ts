// Angular imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

// Application component imports
import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { DemoComponent } from './components/demo/demo.component';

@NgModule({
    imports: [ 
        BrowserModule,
        FormsModule,
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
                path: '',
                redirectTo: '/home',
                pathMatch: 'full'
            }
        ])
    ],
    declarations: [ AppComponent, HomeComponent, DemoComponent ],
    bootstrap: [ AppComponent ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy}
    ]
})
export class AppModule {
}
