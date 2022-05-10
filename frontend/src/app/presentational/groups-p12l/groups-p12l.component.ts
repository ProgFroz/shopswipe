import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
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
  @Output() removeMemberEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() generateNewLinkEmitter: EventEmitter<string> = new EventEmitter<string>();
  @Output() promoteOwnerEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteGroupEmitter: EventEmitter<string> = new EventEmitter<string>();
  @Output() leaveGroupEmitter: EventEmitter<string> = new EventEmitter<string>();

  @Input() user: User;
  @Input() group: Group;
  @Input() groupLoading: boolean;
  @Input() generateNewLinkLoading: boolean;

  createGroupModalOpen = false;
  nameFormGroup: FormGroup;
  linkFormGroup: FormGroup;
  settingsModalOpen = false;
  shareModalOpen = false;
  leaveGroupModalOpen = false;
  copied = false;

  link = '';
  constructor() {
    this.nameFormGroup = new FormGroup({
      name: new FormControl('', Validators.minLength(3))
    });
    this.linkFormGroup = new FormGroup({
      link: new FormControl('')
    });
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges(changes: SimpleChanges): void {
    if (this.group) {
      this.link = 'localhost:7080/home/join/' + this.group.code;
    }
  }

  copyLinkToClipboard(): void {
    navigator.clipboard.writeText(this.link).then().catch(e => console.error(e));
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }, 2000);
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

  emitRemoveMemberFromGroup(member: User): void {
    this.removeMemberEmitter.emit({uid: member.uid, gid: member.gid});
  }

  generateNewLink(): void {
    this.generateNewLinkEmitter.emit(this.group.gid);
  }

  leaveGroup(): void {
    if (this.group.members.length < 2) {
      this.deleteGroupEmitter.emit(this.group.gid);
    }
    else if (this.isOwner(this.user)) {
      this.promoteOwnerEmitter.emit({gid: this.group.gid,
        uid: chooseRandomElement(this.group.members.filter(x => x.uid !== this.user.uid)).uid});
    }
    this.leaveGroupEmitter.emit(this.user.uid);
  }
}

export function chooseRandomElement(arr: any[]): User {
  console.log(arr);
  return arr[Math.floor(Math.random() * arr.length)];
}
