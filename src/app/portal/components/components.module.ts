import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { GroupComponent } from './group/group.component';
import { AccountComponent } from './account/account.component';
import { MatIconModule } from '@angular/material/icon';
import { WelcomeComponent } from './welcome/welcome.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserComponent, 
    GroupComponent, 
    AccountComponent, 
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule
  ],
  exports:[
    UserComponent,
    GroupComponent,
    AccountComponent,
    WelcomeComponent
  ]
})
export class ComponentsModule { }
