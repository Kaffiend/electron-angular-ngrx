import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppComponent } from './containers/app/app.component';
import { NavItemComponent } from 'app/core/components/nav-item';
import { ToolbarComponent } from 'app/core/components/toolbar';

export const COMPONENTS = [
  AppComponent,
  NavItemComponent,
  ToolbarComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: COMPONENTS,
  declarations: COMPONENTS,
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
