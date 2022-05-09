import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './container/login/login.component';
import {HomeComponent} from './container/home/home.component';
import {GroupsComponent} from './container/groups/groups.component';

const routes: Routes = [
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, children: [
      { path: '', redirectTo: 'group', pathMatch: 'full' },
      { path: 'group', component: GroupsComponent },
    ]}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
