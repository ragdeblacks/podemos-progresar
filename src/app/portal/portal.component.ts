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
  activeGroup = false;
  activeAccount = false;
  step = 1;
  localInfo: DataLocal = new DataLocal();
  creditInfo!: any[];
  typeAffiliate: any;
  amount = 0;
  countCred = 0;
  errorGroup: any = '';
  errorCredit = false;
  constructor(
    public service: TransactionService
  ) {   }

  ngOnInit() {
    if(localStorage.getItem('step')){
      this.step = Number(localStorage.getItem('step'));
    }
    if(localStorage.getItem('idCustomer')){
      
      this.localInfo.nameCustomer = localStorage.getItem('nameCustomer')!;
      this.localInfo.idCustomer = localStorage.getItem('idCustomer')!;
      this.activeUser = true;
      //this.step = 0;
    }
    if(localStorage.getItem('idGroup')){
      this.localInfo.idGroup = localStorage.getItem('idGroup')!;
      this.localInfo.nameGroup = localStorage.getItem('nameGroup')!;
      this.typeAffiliate = localStorage.getItem('typeAffiliate')!;
      this.countCred = Number(localStorage.getItem('countCred')!);
    }
  }
  creationProcess(data: any){
    switch(data.step){
      case 2:
        this.changeStep(data.step);
      break;
      case 3:
        const payload = {
          id: this.randomId(),
          nombre: this.localInfo.nameCustomer
        };
        this.service.setCustomer(payload).subscribe((res)=>{
          this.localInfo.nameCustomer = res.nombre;
          this.localInfo.idCustomer = res.id;
          localStorage.setItem('idCustomer',res.id);
          localStorage.setItem('nameCustomer',res.nombre);
          this.activeUser = true;
          this.changeStep(data.step);
        },error => console.log("Error: ", error));
      break;
      case 4:
        this.typeAffiliate = data.optionGroup;
        localStorage.setItem('typeAffiliate',data.optionGroup);
        if(this.typeAffiliate == '1'){
          const payload = [{
            id: this.localInfo.idCustomer
          }];
          this.service.setGroupMember(this.errorGroup.id,payload).subscribe(res=>{
              this.localInfo.nameGroup = res.grupo.nombre;
              this.localInfo.idGroup = res.grupo.id;
              localStorage.setItem('idGroup',res.grupo.id);
              localStorage.setItem('nameGroup',res.grupo.nombre);
              this.activeGroup = true;
              this.changeStep(data.step);
          },error =>{
            console.log(error);
          });
        }else{
          const payload = {
            id: this.randomId(),
            nombre: data.name
          };
          this.service.setGroup(payload).subscribe(res=>{
            this.localInfo.nameGroup = res.nombre;
            this.localInfo.idGroup = res.id;
            localStorage.setItem('idGroup',res.id);
            localStorage.setItem('nameGroup',res.nombre);
            this.activeGroup = true;
            this.changeStep(data.step);
          },error =>{
            console.log(error);
          });
        }
      break;
      case 5:
        if(this.amount===0){
          this.errorCredit = true;
        }else{
          this.errorCredit = false;
          if(this.typeAffiliate == '1'){

          }else{
            this.countCred++;
            const payload = {
              id: 'CRED-'+this.countCred,
              monto: this.amount
            };
            this.service.setGroupAccount(this.localInfo.idGroup,payload).subscribe(res=>{
              const result: any = res;
              this.creditInfo = result;
              localStorage.setItem('listCredits',JSON.stringify(this.creditInfo));
              this.changeStep(0);
              this.activeAccount = true;
              localStorage.setItem('countCred',this.countCred.toString());
            },error =>{
              console.log(error);
            });
          }

        }
        
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

  searchGroup(data: any){
    return this.service.getGroupbyId(data.name).subscribe(res=>{
      this.errorGroup = res;
      return res;
    },error =>{
      this.errorGroup = 'error';
        return error;
    } );
  }

}
