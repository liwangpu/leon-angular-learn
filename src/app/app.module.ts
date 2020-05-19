import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategyService } from './custom-route-reuse-strategy.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        BrowserAnimationsModule,
        AppRoutingModule
    ],
    providers: [
        // {
        //     provide: RouteReuseStrategy,
        //     useClass: CustomRouteReuseStrategyService
        // }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
