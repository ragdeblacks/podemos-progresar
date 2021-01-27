import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['../../portal.component.scss']
})
export class GroupComponent {
  @Output() oncreationProcess = new EventEmitter<any>();
  @Output() onsearchGroup = new EventEmitter<any>();
  @Input() step: any;
  @Input() error: any;
  typeAffiliate = 0;
  nameGroup = '';
  searchName = '';
  constructor() { }
  // tslint:disable-next-line: typedef
  creationProcess(view: number){
    const data = {
      step: view,
      optionGroup: this.typeAffiliate,
      name: (this.nameGroup === '') ? this.error.nombre : this.nameGroup,
      id: this.searchName
    };
    this.oncreationProcess.emit(data);
  }
  // tslint:disable-next-line: typedef
  changeOptionGroup(res: any){
    const element = res.srcElement;
    this.typeAffiliate = element.value;
  }
  // tslint:disable-next-line: typedef
  searchGroup(){
    const data = {
      name: this.searchName
    };
    this.onsearchGroup.emit(data);
  }

}
