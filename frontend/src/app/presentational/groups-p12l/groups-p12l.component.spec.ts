import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsP12lComponent } from './groups-p12l.component';

describe('GroupsP12lComponent', () => {
  let component: GroupsP12lComponent;
  let fixture: ComponentFixture<GroupsP12lComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupsP12lComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsP12lComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
