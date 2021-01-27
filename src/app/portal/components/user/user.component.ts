import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['../../portal.component.scss']
})
export class UserComponent {
  @Output() oncreationProcess = new EventEmitter<any>();
  @Output() onsearchCustomer = new EventEmitter<any>();
  @Input() step: any;
  @Input() typeCustomer: any;
  nameCustomer = '';
  error = false;
  constructor() { }
  // tslint:disable-next-line: typedef
  clear(){
    this.error = false;
  }
  // tslint:disable-next-line: typedef
  searchCustomer(){
    if (this.nameCustomer !== ''){
      const data = {
        id: this.nameCustomer
      };
      this.onsearchCustomer.emit(data);
    }else{
      this.error = true;
    }
  }
  // tslint:disable-next-line: typedef
  creationProcess(view: number){
    const data = {
      step: view,
      name: this.nameCustomer
    };
    this.oncreationProcess.emit(data);
  }
}
