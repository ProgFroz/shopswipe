import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {FinanceElement, Finances, Group, User} from '../../models';
import * as moment from 'moment';
import {FinancesHelper, FinancesMeta, MonthYear} from '../../util/finances.helper';

@Component({
  selector: 'app-finances-p12l',
  templateUrl: './finances-p12l.component.html',
  styleUrls: ['./finances-p12l.component.css']
})
export class FinancesP12lComponent implements OnInit {

  @Input() finances: Finances;
  @Input() financesLoading: boolean;
  @Input() financesGroupedByMonth: Map<string, Map<string, FinanceElement[]>>;
  @Input() financesMetaInformation: Map<string, FinancesMeta[]>;
  @Input() financesSumsByUserByMonth: Map<string, Map<string, number>>;
  @Input() user: User;
  @Input() group: Group;
  @Input() groupLoading: boolean;
  @Input() groupMembersLoading: boolean;

  selectedMonth = 0;

  // @Output() newElementEmitter: EventEmitter<any> = new EventEmitter<any>();

  financesHelper = FinancesHelper;
  months = [];
  constructor() {
  }

  ngOnInit(): void {

  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (!!this.financesGroupedByMonth) {
      this.months = Array.from(this.financesGroupedByMonth.keys());
      this.months.sort((a, b) => FinancesHelper.getMonthFromMonthYearKey(b) - FinancesHelper.getMonthFromMonthYearKey(a));
    }

  }

}
