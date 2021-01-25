import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['../../portal.component.scss']
})
export class UserComponent implements OnInit {
  @Output() oncreationProcess = new EventEmitter<any>();
  @Input() step: any;
  nameCustomer = '';
  error = false;
  constructor() { }

  ngOnInit(): void {
  }
  clear(){
    this.error = false;
  }
  creationProcess(view: number){
    if(this.nameCustomer!==''){
      const data = {
        step: view,
        name: this.nameCustomer
      };
      this.oncreationProcess.emit(data);
    }else{
      this.error = true;
    }
  }
}
