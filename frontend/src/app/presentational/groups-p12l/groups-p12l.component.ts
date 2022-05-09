import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Group, User} from '../../models';

@Component({
  selector: 'app-groups-p12l',
  templateUrl: './groups-p12l.component.html',
  styleUrls: ['./groups-p12l.component.css']
})
export class GroupsP12lComponent implements OnInit {

  @Output() createGroupEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Input() user: User;
  @Input() group: Group;
  @Input() groupLoading: boolean;

  createGroupModalOpen = false;
  nameFormGroup: FormGroup;

  constructor() {
    this.nameFormGroup = new FormGroup({
      name: new FormControl('', Validators.minLength(3))
    });
  }

  ngOnInit(): void {
  }

  emitCreateGroup(): void {
    this.createGroupEmitter.emit({name: this.nameFormGroup.get('name').value, owner: this.user.uid});
  }

  submitName(): void {
    this.createGroupModalOpen = false;
    this.emitCreateGroup();
    this.nameFormGroup.reset();
  }
}
