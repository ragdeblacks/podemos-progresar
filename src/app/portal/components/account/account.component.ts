import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['../../portal.component.scss']
})
export class AccountComponent{
  @Output() onsearchPaymentList = new EventEmitter<any>();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onPayment = new EventEmitter<any>();
  @Output() oncreateAccount = new EventEmitter<any>();
  @Input() listCredits: any;
  @Input() listPaymentCalendar: any;
  amountNew = '';
  constructor() { }
  // tslint:disable-next-line: typedef
  searchPaymentList(id: any){
    const data = {id};
    this.onsearchPaymentList.emit(data);
  }
  // tslint:disable-next-line: typedef
  payment(amount: string, account: string){
    const data = {
      monto: amount,
      cuenta: account
    };
    this.onPayment.emit(data);
  }
  // tslint:disable-next-line: typedef
  createAccount(){
    const data = {
        monto: this.amountNew
    };
    this.oncreateAccount.emit(data);
  }
  // tslint:disable-next-line: typedef
  decimalNumber(){
    if (this.amountNew !== ''){
      this.amountNew = Number.parseFloat(this.amountNew).toFixed(2);
    }
  }

}
