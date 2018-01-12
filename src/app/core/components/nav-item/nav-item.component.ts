import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'kaf-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent {

  @Input() label = '';
  @Input() routerLink: string | any[] = '/';
  @Output() navigate = new EventEmitter();

}
