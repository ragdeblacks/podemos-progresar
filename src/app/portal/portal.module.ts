import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from './portal.component';
import { MatIconModule } from '@angular/material/icon';
import { ComponentModule } from '../component/component.module';
import { ComponentsModule } from './components/components.module';
import { TransactionService } from '../core/service/transaction.service';


@NgModule({
  declarations: [
    PortalComponent
  ],
  imports: [
    CommonModule,
    PortalRoutingModule,
    MatIconModule,
    ComponentModule,
    ComponentsModule
  ],
  providers:[
    TransactionService
  ]
})
export class PortalModule { }
