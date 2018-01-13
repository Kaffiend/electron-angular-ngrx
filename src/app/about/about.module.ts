import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AboutPageComponent } from './containers/about-page/about-page.component';

export const COMPONENTS = [AboutPageComponent];

@NgModule({
  imports: [CommonModule,
    RouterModule.forChild([
      { path: 'about', component: AboutPageComponent }
    ])],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class AboutModule {}
