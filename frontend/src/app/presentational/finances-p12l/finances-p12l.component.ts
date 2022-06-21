import {Component, Input, OnInit} from '@angular/core';
import {FinanceElement, Finances, Group, User} from '../../models';

@Component({
  selector: 'app-finances-p12l',
  templateUrl: './finances-p12l.component.html',
  styleUrls: ['./finances-p12l.component.css']
})
export class FinancesP12lComponent implements OnInit {

  @Input() finances: Finances;
  @Input() financesLoading: boolean;
  @Input() financesGrouped: Map<string, FinanceElement[]>;
  @Input() financesSumsByUser: Map<string, number>;
  @Input() user: User;
  @Input() group: Group;
  @Input() groupLoading: boolean;
  @Input() groupMembersLoading: boolean;

  // @Output() newElementEmitter: EventEmitter<any> = new EventEmitter<any>();


  constructor() {
  }

  ngOnInit(): void {
  }

  findAccordingMember(uid: string): User {
    for (const member of this.group.members) {
      if (member.uid === uid) { return member; }
    }
    return null;
  }

}
