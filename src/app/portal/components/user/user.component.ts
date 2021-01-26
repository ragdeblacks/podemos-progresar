import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['../../portal.component.scss']
})
export class UserComponent implements OnInit {
  @Output() oncreationProcess = new EventEmitter<any>();
  @Output() onsearchCustomer = new EventEmitter<any>();
  @Input() step: any;
  @Input() typeCustomer: any;
  nameCustomer = '';
  error = false;
  
  constructor() { }

  ngOnInit(): void {
  }
  clear(){
    this.error = false;
  }
  searchCustomer(){
    if(this.nameCustomer!==''){
      const data = {
        id: this.nameCustomer
      };
      this.onsearchCustomer.emit(data);
    }else{
      this.error = true;
    }
  }
  creationProcess(view: number){
    const data = {
      step: view,
      name: this.nameCustomer
    };
    this.oncreationProcess.emit(data);
  }
}
