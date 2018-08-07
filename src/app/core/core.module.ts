import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CoreComponentsModule } from './components/core-components.module';

import { AppComponent } from './containers/app/app.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CoreComponentsModule
  ],
  exports: [AppComponent],
  declarations: [AppComponent],
  providers: [],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: []
    };
  }
 }
