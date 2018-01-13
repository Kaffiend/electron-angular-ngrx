import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeoplePageComponent } from 'app/people/containers/people-page';
import { RouterModule } from '@angular/router';

export const COMPONENTS = [
  PeoplePageComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'people', component: PeoplePageComponent}
    ])
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class PeopleModule { }
