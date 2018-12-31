import { Component, OnInit, HostBinding } from '@angular/core';

import { routeFadeStateTrigger, routeSlideStateTrigger } from '../animations/route-animations';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [routeFadeStateTrigger, routeSlideStateTrigger]
})
export class UsersComponent implements OnInit {
  // Route Animations: Bind to the component element in the DOM, like a CSS class
  // We attach the trigger
  // @HostBinding('@routeFadeState') routeAnimations = true;
  @HostBinding('@routeSlideState') routeAnimations = true;

  constructor() { }

  ngOnInit() {
  }

}
