import { Component, OnInit, Input } from '@angular/core';
import { Person } from 'app/people/models/people';

@Component({
  selector: 'kaf-people-list-item',
  templateUrl: './people-list-item.component.html',
  styleUrls: ['./people-list-item.component.scss']
})
export class PeopleListItemComponent implements OnInit {
  @Input() person: Person;
  constructor() { }

  ngOnInit() {
  }

}
