import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../../portal/portal.component.scss']
})
export class HeaderComponent{
  @Output() onchangeModule = new EventEmitter<any>();
  constructor() { }
  // tslint:disable-next-line: typedef
  changeModule(view: string){
    const data = {
      view
    };
    this.onchangeModule.emit(data);
  }

}
