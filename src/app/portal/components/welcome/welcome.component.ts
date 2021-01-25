import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['../../portal.component.scss']
})
export class WelcomeComponent implements OnInit {
  @Output() oncreationProcess = new EventEmitter<any>();
  @Input() step: any;
  constructor() { }

  ngOnInit(): void {
  }
  creationProcess(view: number){
    const data = {step: view};
    this.oncreationProcess.emit(data);
  }

}
