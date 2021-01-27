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
  viewMenu = 'default';
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
  typeCustomer = '';
  private groupAccountObs: Subject<any> = new Subject<any>();
  private searchGroupAccountObs: Subject<any> = new Subject<any>();
  private searchPaymentObs: Subject<any> = new Subject<any>();
  constructor(
    public service: TransactionService
  ) {   }

  ngOnInit(): void {
    if (localStorage.getItem('step')){
      this.step = Number(localStorage.getItem('step'));
    }
    if (localStorage.getItem('idCustomer')){
      // tslint:disable-next-line: no-non-null-assertion
      this.localInfo.nameCustomer = localStorage.getItem('nameCustomer')!;
      // tslint:disable-next-line: no-non-null-assertion
      this.localInfo.idCustomer = localStorage.getItem('idCustomer')!;
      this.activeUser = true;
    }
    if (localStorage.getItem('idGroup')){
      // tslint:disable-next-line: no-non-null-assertion
      this.localInfo.idGroup = localStorage.getItem('idGroup')!;
      // tslint:disable-next-line: no-non-null-assertion
      this.localInfo.nameGroup = localStorage.getItem('nameGroup')!;
      // tslint:disable-next-line: no-non-null-assertion
      this.typeAffiliate = localStorage.getItem('typeAffiliate')!;
      // tslint:disable-next-line: no-non-null-assertion
      this.countCred = Number(localStorage.getItem('countCred')!);
    }
    if (localStorage.getItem('listCredits')){
      this.step = 0;
      this.activeAccount = true;
      this.getGroupAccount();
    }

  }
  // tslint:disable-next-line: typedef
  creationProcess(data: any){
    switch (data.step){
      case 2:
        this.changeStep(data.step);
        break;
      case 3:
        if (this.typeCustomer === 'crear'){
          const payload = {
            id: '',
            nombre: data.name,
            step: data.step
          };
          this.setCustomer(payload);
        }else{
          this.activeUser = true;
          this.changeStep(data.step);
        }
        break;
      case 4:
        this.typeAffiliate = data.optionGroup;
        localStorage.setItem('typeAffiliate', data.optionGroup);
        if (this.typeAffiliate === '1'){
          const payload = [{
            id: this.localInfo.idCustomer
          }];
          // tslint:disable-next-line: deprecation
          this.service.setGroupMember(data.id, payload).subscribe(res => {
              this.localInfo.nameGroup = data.name;
              this.localInfo.idGroup = data.id;
              localStorage.setItem('idGroup', data.id);
              localStorage.setItem('nameGroup', data.name);
              this.activeGroup = true;
              this.changeStep(data.step);
          }, error => {
            console.log(error);
          });
        }else{
          const payload = {
            id: this.randomId(),
            nombre: data.name,
            step: data.step
          };
          this.setGroups(payload);
        }
        break;
      case 5:
        if (this.typeAffiliate === '2'){
          if (this.amount === 0){
            this.errorCredit = true;
          }else{
            this.errorCredit = false;
            this.createAccount({monto: this.amount});
          }
        }
        this.searchGroupAccount();
        // tslint:disable-next-line: deprecation
        this.statusSearchGroupAccount$.subscribe(res  => {
          localStorage.setItem('listCredits', JSON.stringify(res));
          this.listCredits = res;
          this.changeStep(0);
          this.activeAccount = true;
        }, error => {
          console.log(error);
        });
        break;
    }
  }
  // tslint:disable-next-line: typedef
  changeStep(view: number){
    this.step = view;
    localStorage.setItem('step', view.toString());
  }
  // tslint:disable-next-line: typedef
  randomId(){
    return Math.random().toString(36).substr(2, 9).toUpperCase();
  }
  // tslint:disable-next-line: typedef
  searchGroup(data: any){
    // tslint:disable-next-line: deprecation
    return this.service.getGroupbyId(data.name).subscribe(res => {
      this.errorGroup = res;
      return res;
    }, error => {
      this.errorGroup = 'error';
      return error;
    } );
  }
  // tslint:disable-next-line: typedef
  searchGroupAccount(){
     // tslint:disable-next-line: deprecation
    this.service.getGroupAccounts(this.localInfo.idGroup).subscribe(res => {
      this.searchGroupAccountObs.next(res);
    }, error => {
      this.searchGroupAccountObs.error(error);
    });
  }
  // tslint:disable-next-line: typedef
  getGroupAccount(){
    this.searchGroupAccount();
    // tslint:disable-next-line: deprecation
    this.statusSearchGroupAccount$.subscribe(res  => {
      localStorage.setItem('listCredits', JSON.stringify(res));
      this.listCredits = res;
    }, error => {
      console.log(error);
    });
  }
  // tslint:disable-next-line: typedef
  setGroupAccount(payload: any ){
    // tslint:disable-next-line: deprecation
    this.service.setGroupAccount(this.localInfo.idGroup, payload).subscribe(res => {
      this.groupAccountObs.next(res);
    }, error  => {
      this.groupAccountObs.error(error);
    });
  }
  // tslint:disable-next-line: typedef
  searchPaymentList(data: any){
    this.listPaymentCalendar = [];
    // tslint:disable-next-line: deprecation
    this.service.getAccountPaymentCalendar(data.id).subscribe(res => {
      this.listPaymentCalendar = res;
      this.searchPaymentObs.next('success');
    }, error => {
      this.searchPaymentObs.error('error');
      console.log(error);
    });
  }
  // tslint:disable-next-line: typedef
  payment(data: any){
    // tslint:disable-next-line: deprecation
    this.service.setAccountPayment(data.cuenta, {monto: data.monto}).subscribe(res => {
      this.searchPaymentList({id: res.cuenta});
      this.getGroupAccount();
    }, error => {
      console.log(error);
    });
  }
  // tslint:disable-next-line: typedef
  createAccount(data: any){
    this.countCred++;
    const payload = {
      id: 'CRED-' + this.localInfo.nameGroup + '-' + this.countCred,
      monto: data.monto
    };
    this.setGroupAccount(payload);
    // tslint:disable-next-line: deprecation
    this.statusSetAccount$.subscribe(res => {
      localStorage.setItem('countCred', this.countCred.toString());
      this.getGroupAccount();
    }, error => {
      console.log(error);
    });
  }
  // tslint:disable-next-line: typedef
  searchCustomer(data: any){
    // tslint:disable-next-line: deprecation
    this.service.getCustomerbyId(data.id).subscribe(res => {
      this.localInfo.nameCustomer = res.nombre;
      this.localInfo.idCustomer = res.id;
      localStorage.setItem('idCustomer', res.id);
      localStorage.setItem('nameCustomer', res.nombre);
      this.typeCustomer = 'vincular';
    }, error => {
      this.typeCustomer = 'crear';
    });
  }
  // tslint:disable-next-line: typedef
  changeModule(data: any){
    this.viewMenu = data.view;
    if (this.viewMenu === 'group'){
      this.getGroups();
    }else if (this.viewMenu === 'client'){
      this.getCustomer();
    }
  }
  // tslint:disable-next-line: typedef
  setCustomer(data: any ){
    if (data.id === ''){
      data.id = this.randomId();
    }
    // tslint:disable-next-line: deprecation
    this.service.setCustomer(data).subscribe(res => {
      if (data.step !== ''){
        this.saveCustomer(res, data.step);
      }else{
        this.getCustomer();
      }
    }, error => {
      console.log(error);
    });
  }
  // tslint:disable-next-line: typedef
  setGroups(data: any){
    if (data.id === ''){
      data.id = this.randomId();
    }
    // tslint:disable-next-line: deprecation
    this.service.setGroup(data).subscribe(res => {
      if (data.step !== ''){
        this.saveGroup(res, data.step);
      }else{
        this.getGroups();
      }
    }, error => {
      console.log(error);
    });
  }
  // tslint:disable-next-line: typedef
  getCustomer(){
    this.listCustomers = [];
    // tslint:disable-next-line: deprecation
    this.service.getCustomers().subscribe(res => {
      this.listCustomers = res;
    }, error => {});
  }
  // tslint:disable-next-line: typedef
  getGroups(){
    this.listGroup = [];
    // tslint:disable-next-line: deprecation
    this.service.getGroups().subscribe(res => {
      this.listGroup = res;
    }, error => {});
  }
  // tslint:disable-next-line: typedef
  saveCustomer(res: any, step: any){
      this.localInfo.nameCustomer = res.nombre;
      this.localInfo.idCustomer = res.id;
      localStorage.setItem('idCustomer', res.id);
      localStorage.setItem('nameCustomer', res.nombre);
      this.activeUser = true;
      this.changeStep(step);
  }
  // tslint:disable-next-line: typedef
  saveGroup(res: any, step: any){
    this.localInfo.nameGroup = res.nombre;
    this.localInfo.idGroup = res.id;
    localStorage.setItem('idGroup', res.id);
    localStorage.setItem('nameGroup', res.nombre);
    this.activeGroup = true;
    this.changeStep(step);
  }
  // tslint:disable-next-line: typedef
  get statusSetAccount$() {
    return this.groupAccountObs.asObservable();
  }
  // tslint:disable-next-line: typedef
  get statusSearchGroupAccount$() {
    return this.searchGroupAccountObs.asObservable();
  }
  // tslint:disable-next-line: typedef
  get statusSearchPayment$() {
    return this.searchPaymentObs.asObservable();
  }

}
