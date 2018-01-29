import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigurationComponentsModule } from '../../components/configuration-components.module';

import { ConfigPageComponent } from './config-page.component';

describe('ConfigPageComponent', () => {
  let component: ConfigPageComponent;
  let fixture: ComponentFixture<ConfigPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ConfigurationComponentsModule],
      declarations: [ ConfigPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
