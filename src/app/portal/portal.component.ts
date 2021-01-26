import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DataLocal } from '../core/model/dataLocal';
import { TransactionService } from '../core/service/transaction.service';
@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {
  viewMenu = 'client'; //default
  activeUser = false;
  activeGroup = false;
  activeAccount = false;
  step = 1;
  localInfo: DataLocal = new DataLocal();
  listCredits?: any = [];
  listPaymentCalendar?: any = [];
  listCustomers?: any [];
  listGroup?: any [];
  typeAffiliate: any;
  amount = 0;
  countCred = 0;
  errorGroup: any = '';
  errorCredit = false;
  typeCustomer='';
  private groupAccountObs: Subject<any> = new Subject<any>();
  private searchGroupAccountObs: Subject<any> = new Subject<any>();
  private searchPaymentObs: Subject<any> = new Subject<any>();
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
      //
    }
    if(localStorage.getItem('idGroup')){
      this.localInfo.idGroup = localStorage.getItem('idGroup')!;
      this.localInfo.nameGroup = localStorage.getItem('nameGroup')!;
      this.typeAffiliate = localStorage.getItem('typeAffiliate')!;
      this.countCred = Number(localStorage.getItem('countCred')!);
    }
    if(localStorage.getItem('listCredits')){
      this.step = 0;
      this.activeAccount = true;
      this.getGroupAccount();
    }

    /**borrar al final  */
    this.getCustomer();
  }
  creationProcess(data: any){
    switch(data.step){
      case 2:
        this.changeStep(data.step);
      break;
      case 3:
        if(this.typeCustomer == 'crear'){
          const payload = {
            id: this.randomId(),
            nombre: data.name
          };
          this.service.setCustomer(payload).subscribe((res)=>{
            this.localInfo.nameCustomer = res.nombre;
            this.localInfo.idCustomer = res.id;
            localStorage.setItem('idCustomer',res.id);
            localStorage.setItem('nameCustomer',res.nombre);
            this.activeUser = true;
            this.changeStep(data.step);
          },error => console.log("Error: ", error));
        }else{
          this.activeUser = true;
          this.changeStep(data.step);
        }
      break;
      case 4:
        this.typeAffiliate = data.optionGroup;
        localStorage.setItem('typeAffiliate',data.optionGroup);
        if(this.typeAffiliate == '1'){
          const payload = [{
            id: this.localInfo.idCustomer
          }];
          this.service.setGroupMember(data.id,payload).subscribe(res=>{
              this.localInfo.nameGroup = data.name;
              this.localInfo.idGroup = data.id;
              localStorage.setItem('idGroup',data.id);
              localStorage.setItem('nameGroup',data.name);
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
        if(this.typeAffiliate == '2'){
          if(this.amount===0){
            this.errorCredit = true;
          }else{
            this.errorCredit = false;
            this.createAccount({monto: this.amount});
          }
        }
        this.searchGroupAccount();
        this.statusSearchGroupAccount$.subscribe(res =>{
          localStorage.setItem('listCredits',JSON.stringify(res));
          this.listCredits = res;
          this.changeStep(0);
          this.activeAccount = true;
        },error=>{
          console.log(error);
        });
        
      break;
    }
  }
  changeStep(view: number){
    this.step = view;
    localStorage.setItem('step',this.step.toString());
  }
  randomId(){
    return Math.random().toString(36).substr(2, 9).toUpperCase();
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

  searchGroupAccount(){
    this.service.getGroupAccounts(this.localInfo.idGroup).subscribe(res=>{
      this.searchGroupAccountObs.next(res);
    },error =>{
      this.searchGroupAccountObs.error(error);
    });
  }
  getGroupAccount(){
    this.searchGroupAccount();
    this.statusSearchGroupAccount$.subscribe(res =>{
      localStorage.setItem('listCredits',JSON.stringify(res));
      this.listCredits = res;
    },error=>{
      console.log(error);
    });
  }

  setGroupAccount(payload: any ){
    this.service.setGroupAccount(this.localInfo.idGroup,payload).subscribe(res=>{
      this.groupAccountObs.next(res);
    },error =>{
      this.groupAccountObs.error(error);
    });
  }
  searchPaymentList(data: any){
    this.listPaymentCalendar = [];
    this.service.getAccountPaymentCalendar(data.id).subscribe(res=>{
      this.listPaymentCalendar = res;
      this.searchPaymentObs.next('success');
    },error=>{
      this.searchPaymentObs.error('error');
      console.log(error);
    });
  }
  payment(data: any){
    this.service.setAccountPayment(data.cuenta,{monto:data.monto}).subscribe(res=>{
      this.searchPaymentList({id:res.cuenta});
      this.getGroupAccount();
    },error=>{
      console.log(error);
    });
  }
  createAccount(data: any){
    this.countCred++;
    const payload = {
      id: 'CRED-'+this.localInfo.nameGroup+'-'+this.countCred,
      monto: data.monto
    };
    this.setGroupAccount(payload);
    this.statusSetAccount$.subscribe(res=>{
      localStorage.setItem('countCred',this.countCred.toString());
      this.getGroupAccount();
    },error=>{
      console.log(error);
    });
  }
  searchCustomer(data: any){
    this.service.getCustomerbyId(data.id).subscribe(res=>{
      this.localInfo.nameCustomer = res.nombre;
      this.localInfo.idCustomer = res.id;
      localStorage.setItem('idCustomer',res.id);
      localStorage.setItem('nameCustomer',res.nombre);
      this.typeCustomer = 'vincular';
    },error=>{
      this.typeCustomer = 'crear';
    });
  }
  changeModule(data: any){
    this.viewMenu = data.view;
    if(this.viewMenu == 'group'){
      this.getGroups();
    }else if(this.viewMenu == 'client'){
      this.getCustomer();
    }
  }
  setCustomer(data: any ){
    if(data.id==''){
      data.id = this.randomId();
    }
    this.service.setCustomer(data).subscribe(res=>{
      this.getCustomer();
    },error=>{
      console.log(error)
    })
  }
  setGroups(data: any){
    if(data.id==''){
      data.id = this.randomId();
    }
    this.service.setGroup(data).subscribe(res=>{
      this.getGroups();
    },error=>{
      console.log(error)
    })
  }
  getCustomer(){
    this.listCustomers = [];
    this.service.getCustomers().subscribe(res=>{
      this.listCustomers = res;
    },error=>{});
  }
  getGroups(){
    this.listGroup = [];
    this.service.getGroups().subscribe(res=>{
      this.listGroup = res;
    },error=>{});
  }
  get statusSetAccount$() {
    return this.groupAccountObs.asObservable();
  }
  get statusSearchGroupAccount$() {
    return this.searchGroupAccountObs.asObservable();
  }
  get statusSearchPayment$() {
    return this.searchPaymentObs.asObservable();
  }

}
