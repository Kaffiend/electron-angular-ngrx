import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { CoreModule } from 'app/core/core.module';
import { AppComponent } from 'app/core/containers/app';
import { HomePageComponent } from 'app/home/containers/home-page';
import { HomeModule } from 'app/home/home.module';
import { StoreRouterConnectingModule } from '@ngrx/router-store/src/router_store_module';
import { RouterStateSerializer } from '@ngrx/router-store/src/serializer';
import { CustomRouterStateSerializer } from 'app/shared/utils';
import { reducers } from 'app/reducers/root.reducer';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    CommonModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    CoreModule.forRoot(),
    HomeModule,
    StoreModule.forRoot([
      reducers
    ]),
    RouterModule.forRoot([{path: './', component: HomePageComponent}]),
    StoreRouterConnectingModule
  ],
  providers: [
    {provide: RouterStateSerializer, useClass: CustomRouterStateSerializer}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
