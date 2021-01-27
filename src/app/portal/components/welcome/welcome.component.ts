import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['../../portal.component.scss']
})
export class WelcomeComponent {
  @Output() oncreationProcess = new EventEmitter<any>();
  @Input() step: any;
  constructor() { }
  // tslint:disable-next-line: typedef
  creationProcess(view: number){
    const data = {step: view};
    this.oncreationProcess.emit(data);
  }

}
