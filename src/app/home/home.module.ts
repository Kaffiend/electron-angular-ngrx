import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './containers/home-page/home-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'home', component: HomePageComponent},
      {path: '',  pathMatch: 'full', redirectTo: 'home'}
    ])
  ],
  declarations: [HomePageComponent],
  exports: [HomePageComponent]
})
export class HomeModule { }
