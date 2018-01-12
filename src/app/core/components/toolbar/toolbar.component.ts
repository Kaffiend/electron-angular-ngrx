import { Component, Input} from '@angular/core';

@Component({
  selector: 'kaf-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {


  @Input() title = 'Electron-Angular-NGRX';
}
