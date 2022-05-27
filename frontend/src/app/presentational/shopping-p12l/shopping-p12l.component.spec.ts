import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingP12lComponent } from './shopping-p12l.component';

describe('ShoppingP12lComponent', () => {
  let component: ShoppingP12lComponent;
  let fixture: ComponentFixture<ShoppingP12lComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingP12lComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingP12lComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
