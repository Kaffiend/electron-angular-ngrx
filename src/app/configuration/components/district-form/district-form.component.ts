import { Component, OnInit, Inject, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { District } from '../../models/district';
import { Observable } from 'rxjs/Observable';
import * as fromDistrictForm from '../../reducers/district-form.reducer';
import * as fromConfig from '../../reducers/configuration.reducer';
import { FormGroupState } from 'ngrx-forms/src/state';

@Component({
  selector: 'kaf-district-form',
  templateUrl: './district-form.component.html',
  styleUrls: ['./district-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DistrictFormComponent implements OnInit {

  @Input() formState: Observable<FormGroupState<fromDistrictForm.DistrictFormState>>;
  submit = new EventEmitter<District>();

  onSubmit(): boolean {
    return false;
  }

  ngOnInit() {
  }

}
