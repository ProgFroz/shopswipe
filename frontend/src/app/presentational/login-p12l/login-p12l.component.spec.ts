import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginP12lComponent } from './login-p12l.component';

describe('LoginP12lComponent', () => {
  let component: LoginP12lComponent;
  let fixture: ComponentFixture<LoginP12lComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginP12lComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginP12lComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
