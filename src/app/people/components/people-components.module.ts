import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleListComponent } from 'app/people/components/people-list/people-list.component';

const COMPONENTS = [
  PeopleListComponent,
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class PeopleComponentsModule { }
