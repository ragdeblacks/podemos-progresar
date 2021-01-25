import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['../../portal.component.scss']
})
export class GroupComponent implements OnInit {
  @Output() oncreationProcess = new EventEmitter<any>();
  @Output() onsearchGroup = new EventEmitter<any>();
  @Input() step: any;
  @Input() error: any;
  typeAffiliate = 0;
  nameGroup = '';
  searchName = '';
  constructor() { }

  ngOnInit(): void {
  }
  creationProcess(view: number){
    const data = {
      step: view,
      optionGroup: this.typeAffiliate,
      name: this.nameGroup
    };
    this.oncreationProcess.emit(data);
  }
  changeOptionGroup(res: any){
    const element = res.srcElement;
    this.typeAffiliate = element.value;
  }
  searchGroup(){
    const data = {
      name: this.searchName
    };
    const result = this.onsearchGroup.emit(data);
  }

}
