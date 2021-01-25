import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['../../portal.component.scss']
})
export class GroupComponent implements OnInit {
  @Output() oncreationProcess = new EventEmitter<any>();
  @Input() step: any;
  typeAffiliate = 0;
  constructor() { }

  ngOnInit(): void {
  }
  creationProcess(view: number){
    const data = {
      step: view,
      optionGroup: this.typeAffiliate
    };
    this.oncreationProcess.emit(data);
  }
  changeOptionGroup(res: any){
    const element = res.srcElement;
    this.typeAffiliate = element.value;
  }

}
