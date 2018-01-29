import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfigPageComponent } from './containers/config-page/config-page.component';
import { ConfigurationComponentsModule } from './components/configuration-components.module';
import { StoreModule } from '@ngrx/store';
import * as fromConfiguration from './reducers/configuration.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ConfigurationEffects } from './effects/configuration.effects';
import { DistrictSocketService } from './sockets/district.socket';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: 'config', component: ConfigPageComponent }]),
    ConfigurationComponentsModule,
    StoreModule.forFeature('configuration', fromConfiguration.reducers),
    EffectsModule.forFeature([ConfigurationEffects])
  ],
  declarations: [
    ConfigPageComponent
  ],
  providers: [
    DistrictSocketService
  ]
})
export class ConfigurationModule {}
