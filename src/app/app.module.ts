import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgxElectronModule } from 'ngx-electron';
import { environment } from '../environments/environment';
import { CoreModule } from 'app/core/core.module';
import { AppComponent } from 'app/core/containers/app';
import { HomePageComponent } from 'app/home/containers/home-page';
import { HomeModule } from 'app/home/home.module';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { RouterStateSerializer } from '@ngrx/router-store';
import { CustomRouterStateSerializer } from 'app/shared/utils';
import { reducers, metaReducers } from 'app/reducers/root.reducer';
import { PeopleModule } from 'app/people/people.module';
import { AboutModule } from 'app/about/about.module';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    NgxElectronModule,
    CommonModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    CoreModule.forRoot(),
    HomeModule,
    PeopleModule,
    AboutModule,
    RouterModule.forRoot([{path: './', component: HomePageComponent}]),
  ],
  providers: [
    {provide: RouterStateSerializer, useClass: CustomRouterStateSerializer}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
