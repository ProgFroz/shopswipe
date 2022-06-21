import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancesP12lComponent } from './finances-p12l.component';

describe('FinancesP12lComponent', () => {
  let component: FinancesP12lComponent;
  let fixture: ComponentFixture<FinancesP12lComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancesP12lComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancesP12lComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
