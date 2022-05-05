import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeP12lComponent } from './home-p12l.component';

describe('HomeP12lComponent', () => {
  let component: HomeP12lComponent;
  let fixture: ComponentFixture<HomeP12lComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeP12lComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeP12lComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
