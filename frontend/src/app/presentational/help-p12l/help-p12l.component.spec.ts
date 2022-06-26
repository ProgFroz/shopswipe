import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpP12lComponent } from './help-p12l.component';

describe('HelpP12lComponent', () => {
  let component: HelpP12lComponent;
  let fixture: ComponentFixture<HelpP12lComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpP12lComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpP12lComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
