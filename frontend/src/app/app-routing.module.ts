import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './container/login/login.component';
import {HomeComponent} from './container/home/home.component';
import {GroupsComponent} from './container/groups/groups.component';
import {JoinGroupComponent} from './container/join-group/join-group.component';
import {ShoppingComponent} from './container/shopping/shopping.component';
import {FinancesComponent} from './container/finances/finances.component';
import {HelpComponent} from './container/help/help.component';

const routes: Routes = [
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, children: [
      { path: '', redirectTo: 'group', pathMatch: 'full' },
      { path: 'group', component: GroupsComponent },
      { path: 'join/:code', component: JoinGroupComponent },
      { path: 'shopping', component: ShoppingComponent },
      { path: 'finances', component: FinancesComponent },
      { path: 'help', component: HelpComponent },
    ]},

  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
