import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {Params} from '@angular/router';
import {Group, User} from '../../models';

@Component({
  selector: 'app-join-group-p12l',
  templateUrl: './join-group-p12l.component.html',
  styleUrls: ['./join-group-p12l.component.css']
})
export class JoinGroupP12lComponent implements OnInit {

  @Input() user: User;
  @Input() invitedGroup: Group;
  @Input() invitedGroupLoading: boolean;

  @Output() joinGroupEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() redirectEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  joinGroupModalOpen = false;
  errorModalOpen = false;

  constructor() { }

  ngOnInit(): void {

  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges(changes: SimpleChanges): void {
    if (!this.invitedGroupLoading) {
      if (this.invitedGroup) {
        if (this.invitedGroup.gid === this.user.gid) {
          this.redirectToGroup();
        }
        else {
          this.joinGroupModalOpen = true;
        }
      }
      else {
        this.errorModalOpen = true;
      }
    }
  }

  submitJoin(): void {
    this.joinGroupEmitter.emit({uid: this.user.uid, gid: this.invitedGroup.gid});
  }

  redirectToGroup(): void {
    this.redirectEmitter.emit(true);
  }
}
