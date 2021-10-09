import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './components/login.component';
import {RegisterComponent} from './components/register.component';
import {DefaultComponent} from './components/default.component';
import { ProfileEditComponent } from './components/profile.edit.component';
import { TaskNewComponent } from './components/task.new.component';
import { TaskDetailComponent } from './components/task.detail.component';
import { TaskEditComponent } from './components/task.edit.component';
import { UserNewComponent } from './components/user.new.component';
import { UserListComponent } from './components/user.list.component';
import { UserEditComponent } from './components/user.edit.component';

const appRoutes: Routes = [
	{path:'', component			: DefaultComponent},
	{path:'index',component		: DefaultComponent},
	{path:'index/:page',component: DefaultComponent},
	{path:'indexU',component		: UserListComponent},
	{path:'indexU/:page',component: UserListComponent},
	{path:'login',component		: LoginComponent},
	{path:'login/:id',component	: LoginComponent},
	{path:'register',component	: RegisterComponent},
	{path:'user-list',component	: UserListComponent},
	{path:'profile-edit',component	: ProfileEditComponent},
	{path:'user-edit/:id',component	: UserEditComponent},
	{path:'user-new', component : UserNewComponent},
	{path:'task-new',component	: TaskNewComponent},
	{path:'task/:id',component	: TaskDetailComponent},
	{path:'index/:page/task/:id',component	: TaskDetailComponent},
	{path:'task-edit/:id',component	: TaskEditComponent},
	{path:'index/:page/task-edit/:id',component	: TaskEditComponent},
	{path:'**',component		: LoginComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);