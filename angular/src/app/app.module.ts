import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';


import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { DefaultComponent } from './components/default.component';
import { ProfileEditComponent } from './components/profile.edit.component';
import { TaskNewComponent } from './components/task.new.component';
import { TaskDetailComponent } from './components/task.detail.component';
import { TaskEditComponent } from './components/task.edit.component';
import { UserNewComponent } from './components/user.new.component';
import { UserEditComponent } from './components/user.edit.component';

//Pipe
import { GenerateDatePipe } from './pipes/generate.date.pipe';
import { UserListComponent } from './components/user.list.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DefaultComponent,
    ProfileEditComponent,
    TaskNewComponent,
    TaskDetailComponent,
    TaskEditComponent,
    GenerateDatePipe,
    UserNewComponent,
    UserListComponent,
    UserEditComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
  	appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
