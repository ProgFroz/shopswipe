import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinGroupP12lComponent } from './join-group-p12l.component';

describe('JoinGroupP12lComponent', () => {
  let component: JoinGroupP12lComponent;
  let fixture: ComponentFixture<JoinGroupP12lComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinGroupP12lComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinGroupP12lComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
