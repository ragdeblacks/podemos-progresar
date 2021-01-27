import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['../../portal.component.scss']
})
export class ListComponent {
  @Output() onsetCustomer = new EventEmitter<any>();
  @Output() onsetGroups = new EventEmitter<any>();
  @Input() viewMenu: any;
  @Input() listCustomers: any;
  @Input() listGroup: any;
  editButtons = '';
  nameEditCustomer = '';
  nameEditGroup = '';
  createDataElem = '';
  viewNewField = '';
  constructor() { }
  // tslint:disable-next-line: typedef
  editCustomer(id: any, name: any){
    this.editButtons = 'customer' + id;
    this.nameEditCustomer = name;
  }
  // tslint:disable-next-line: typedef
  editGroup(id: any, name: any){
    this.editButtons = 'group' + id;
    this.nameEditGroup = name;
  }
  // tslint:disable-next-line: typedef
  closedEdit(){
    this.editButtons = '';
    this.nameEditCustomer = '';
    this.nameEditGroup = '';
    this.createDataElem = '';
  }
  // tslint:disable-next-line: typedef
  saveGroup(id: any){
    const data = {
      id,
      nombre: this.nameEditGroup
    };
    this.onsetGroups.emit(data);
    this.closedEdit();
  }
  // tslint:disable-next-line: typedef
  saveCustomer(id: any){
    const data = {
      id,
      nombre: this.nameEditCustomer
    };
    this.onsetCustomer.emit(data);
    this.closedEdit();
  }
  // tslint:disable-next-line: typedef
  createData(){
    if (this.viewMenu === 'group'){
      const data = {
        id: '',
        step: '',
        nombre: this.createDataElem
      };
      this.onsetGroups.emit(data);
      this.closedEdit();
    }else if (this.viewMenu === 'client'){
      const data = {
        id: '',
        step: '',
        nombre: this.createDataElem
      };
      this.onsetCustomer.emit(data);
      this.closedEdit();
    }
  }

}
