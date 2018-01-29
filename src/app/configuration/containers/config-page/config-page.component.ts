import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromConfiguration from '../../reducers/configuration.reducer';
import * as fromDistrictForm from '../../reducers/district-form.reducer';
import { Observable } from 'rxjs/Observable';
import { FormGroupState } from 'ngrx-forms';
import { DistrictSocketService } from '../../sockets/district.socket';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'kaf-config-page',
  templateUrl: './config-page.component.html',
  styleUrls: ['./config-page.component.scss']
})
export class ConfigPageComponent implements OnInit, OnDestroy {
  districtForm$: Observable<FormGroupState<fromDistrictForm.DistrictFormState>>;
  districtRead$: Subscription;
  districts = [];

  constructor(
    private store: Store<fromConfiguration.ConfigurationState>,
    private districtSocket: DistrictSocketService
  ) {
    this.districtForm$ = this.store.pipe(select(fromConfiguration.getDistrictFormState));
    this.districtRead$ = this.districtSocket.DistrictReturn().subscribe(val => {
      this.districts = val;
      console.log(val);
    });
    this.districtSocket.DistrictRead();
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.districtRead$.unsubscribe();
  }

}
