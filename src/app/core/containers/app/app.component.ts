import { Component, ChangeDetectionStrategy } from '@angular/core';

import { NavItem } from '../../components/nav-item';

@Component({
  selector: 'kaf-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public routeList: NavItem[] = [
    {
      label: 'Home',
      routerLink: '/'
    },
    {
      label: 'People',
      routerLink: '/people'
    },
  ];

}
