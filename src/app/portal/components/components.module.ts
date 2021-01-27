import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { GroupComponent } from './group/group.component';
import { AccountComponent } from './account/account.component';
import { MatIconModule } from '@angular/material/icon';
import { WelcomeComponent } from './welcome/welcome.component';
import { FormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    UserComponent,
    GroupComponent,
    AccountComponent,
    WelcomeComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule
  ],
  exports: [
    UserComponent,
    GroupComponent,
    AccountComponent,
    WelcomeComponent,
    ListComponent
  ]
})
export class ComponentsModule { }
