import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Group, User} from '../../models';
import * as moment from 'moment';

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

  isOwner(member: User): boolean {
    return member.uid === this.group.owner;
  }

  sortMembersArray(members: User[]): User[] {
    if (!members) { return []; }
    const newArr = [];
    const copy = [...members];
    newArr.push(members.filter(x => this.isOwner(x))[0]);
    copy.sort((a, b) => moment(a.date).milliseconds() - moment(b.date).milliseconds());
    copy.forEach((member) => {
      if (!this.isOwner(member)) {
        newArr.push(member);
      }
    });
    return newArr;
  }
}
