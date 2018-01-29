import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleListComponent } from 'app/people/components/people-list/people-list.component';
import { PeopleListItemComponent } from 'app/people/components/people-list-item/people-list-item.component';

const COMPONENTS = [
  PeopleListComponent,
  PeopleListItemComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class PeopleComponentsModule { }
