import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../../portal/portal.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() onchangeModule = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  changeModule(view: string){
    const data = {
      view
    };
    this.onchangeModule.emit(data);
  }

}
