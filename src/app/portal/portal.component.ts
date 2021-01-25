import { Component, OnInit } from '@angular/core';
import { DataLocal } from '../core/model/dataLocal';
import { TransactionService } from '../core/service/transaction.service';
@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {
  activeUser = false;
  activeAccount = false;
  step = 1;
  localInfo: DataLocal = new DataLocal();
  typeAffiliate: any;
  constructor(
    public service: TransactionService
  ) { }

  ngOnInit() {
    if(localStorage.getItem('step')){
      this.step = Number(localStorage.getItem('step'));
    }
    if(localStorage.getItem('idCustomer')){
      this.activeUser = true;
      this.step = 0;
    }
  }
  creationProcess(data: any){
    switch(data.step){
      case 2:
        this.changeStep(data.step);
      break;
      case 3:
        this.localInfo.nameCustomer = data.name;
        const payload = {
          id: this.randomId(),
          nombre: this.localInfo.nameCustomer
        };
        this.service.setCustomer(payload).subscribe((res)=>{
          console.log(res);
          //this.changeStep(data.step);
        },error => console.log("Error: ", error));
      break;
      case 4:
        this.typeAffiliate = data.optionGroup;
      break;
      case 5:
      break;
    }
  }
  changeStep(view: number){
    this.step = view;
    localStorage.setItem('step',this.step.toString());
  }
  randomId(){
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return Math.random().toString(36).substr(2, 9);
  };

}
