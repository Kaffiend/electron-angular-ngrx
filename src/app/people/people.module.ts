import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PeoplePageComponent } from 'app/people/containers/people-page';
import { RouterModule } from '@angular/router';
import { reducers } from './reducers';
import { PeopleEffects } from './effects/people.effects';

export const COMPONENTS = [
  PeoplePageComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'people', component: PeoplePageComponent}
    ]),
    StoreModule.forFeature('people', reducers),
    EffectsModule.forFeature([PeopleEffects])
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class PeopleModule { }
