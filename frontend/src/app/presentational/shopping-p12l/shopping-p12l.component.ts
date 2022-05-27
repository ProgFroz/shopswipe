import {Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild, ViewChildren} from '@angular/core';
import {Group, Shopping, ShoppingElement, User} from '../../models';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {DOCUMENT} from '@angular/common';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import * as hammer from 'hammerjs';

@Component({
  selector: 'app-shopping-p12l',
  templateUrl: './shopping-p12l.component.html',
  styleUrls: ['./shopping-p12l.component.css']
})
export class ShoppingP12lComponent implements OnInit {
  addElementModalOpen: boolean;

  @Input() shopping: Shopping;
  @Input() shoppingLoading: boolean;
  @Input() user: User;
  @Input() group: Group;
  @Input() groupLoading: boolean;
  @Input() groupMembersLoading: boolean;

  @Output() newElementEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteElementEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() finishElementEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() activateElementEmitter: EventEmitter<any> = new EventEmitter<any>();
  elementFormGroup: FormGroup;

  deleted: ShoppingElement[] = [];
  finished: ShoppingElement[] = [];

  @ViewChildren('slides') slides;
  @ViewChild('stack') stack;

  panend = false;

  constructor(@Inject(DOCUMENT) document: Document) {
    this.elementFormGroup = new FormGroup({
      name: new FormControl('', Validators.minLength(1)),
      description: new FormControl(''),
      amount: new FormControl('', Validators.min(1)),
      repeatable: new FormControl(false)
    });
  }

  ngOnInit(): void {
  }

  addElement(): void {
    const newElements: ShoppingElement[] = this.shopping.elements ? [...this.shopping.elements] : [];
    newElements.push({
      uid: this.user.uid,
      name: this.elementFormGroup.get('name').value,
      description: this.elementFormGroup.get('description').value,
      amount: Number(this.elementFormGroup.get('amount').value),
      date: new Date(),
      isRepeatable: this.elementFormGroup.get('repeatable').value,
      isActive: true
    });
    this.newElementEmitter.emit({gid: this.user.gid, elements: newElements});
  }

  sortShoppingElements(elements: ShoppingElement[]): ShoppingElement[] {
    const copy: ShoppingElement[] = [...elements];
    copy.sort(((a, b) => {
      return moment(a.date).milliseconds() - moment(b.date).milliseconds();
    }));
    return copy;
  }

  findAccordingMember(uid: string): User {
    for (const member of this.group.members) {
      if (member.uid === uid) { return member; }
    }
    return null;
  }

  getId(element: ShoppingElement): number {
    return this.sortShoppingElements(this.shopping.elements).indexOf(element);
  }

  deleteElement(element: ShoppingElement): void {
    const newElements: ShoppingElement[] = [];
    this.shopping.elements.forEach((el) => {
      if (element !== el) { newElements.push(el); }
    });
    this.deleteElementEmitter.emit({gid: this.user.gid, elements: newElements});
  }

  finishElement(element: ShoppingElement): void {
    const newElements: ShoppingElement[] = [];
    this.shopping.elements.forEach((el) => {
      if (element !== el) { newElements.push(el); }
    });
    if (element.isRepeatable) { newElements.push({...element, isActive: false}); }
    this.finishElementEmitter.emit({gid: this.user.gid, elements: newElements});
  }

  activateElement(element: ShoppingElement): void {
    const newElements: ShoppingElement[] = [];
    this.shopping.elements.forEach((el) => {
      if (element !== el) { newElements.push(el); }
    });
    newElements.push({...element, isActive: true});
    this.finishElementEmitter.emit({gid: this.user.gid, elements: newElements});
  }

  onPan($event, id: number, element: ShoppingElement): void {
    const el = document.getElementById('' + id);
    const left = $event.deltaX < 0;
    if (!this.panend) {
      el.style.transform = 'translateX(' + $event.deltaX + 'px)';
      let rv = 255 * (1 - ($event.deltaX / -1150));
      rv = rv < 195 ? 195 : rv;
      let gv = 255 * (1 - ($event.deltaX / 1150));
      gv = gv < 195 ? 195 : gv;
      el.style.background = left ? 'rgb(255,' + rv + ',' + rv + ')' : (element.isActive ? 'rgba(' + gv + ',255,' + gv + ')' : 'rgba(' + gv + ',' + gv + ', 255)');
    }
  }

  onPanEnd($event, id: number, element: ShoppingElement): void {
    this.panend = true;
    const el = document.getElementById('' + id);

    const left = $event.deltaX < -150;
    if ($event.deltaX > 150 || $event.deltaX < - 150) {
      el.style.transition = 'all 0.2s ease';
      el.style.transform = $event.deltaX < 0 ? 'translateX(' + -200 + '%)' : 'translateX(' + 200 + '%)';
      if (left) {
        this.deleteElement(element);
      }
      else {
        if (element.isActive) {
          this.finishElement(element);
        }
        else {
          this.activateElement(element);
        }
      }
    } else{
      el.style.transform = 'translateX(' + 0 + 'px)';
      el.style.transition = 'all 0.2s ease';
      el.style.background = 'rgb(255,255,255)';
    }

    el.style.zIndex = '0';
  }

  onPanStart($event, id: number): void {
    const el = document.getElementById('' + id);
    el.style.zIndex = '99';
    this.panend = false;
    el.style.transition = 'none';
  }
}
