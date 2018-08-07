import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../../models/people';
import { Observable } from 'rxjs';

@Component({
  selector: 'kaf-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {

  @Input() peopleList: Observable<Person[]>;
  constructor() { }

  ngOnInit() {
  }

}
