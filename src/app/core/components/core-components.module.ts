import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavItemComponent } from 'app/core/components/nav-item';
import { ToolbarComponent } from 'app/core/components/toolbar';

const COMPONENTS = [
  NavItemComponent,
  ToolbarComponent
] ;


@NgModule({
  imports: [
    RouterModule
  ],
  exports: COMPONENTS,
  declarations: COMPONENTS,
  providers: [],
})
export class CoreComponentsModule { }
