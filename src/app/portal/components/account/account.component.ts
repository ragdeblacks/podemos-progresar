import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['../../portal.component.scss']
})
export class AccountComponent implements OnInit {
  @Output() onsearchPaymentList = new EventEmitter<any>();
  @Output() onPayment = new EventEmitter<any>();
  @Output() oncreateAccount = new EventEmitter<any>();
  @Input() listCredits: any;
  @Input() listPaymentCalendar: any;
  amountNew = '';
  constructor() { }

  ngOnInit(): void {
  }
  searchPaymentList(id: any){
    const data = {id};
    this.onsearchPaymentList.emit(data);
  }
  payment(amount: string,account: string){
    const data = {
      monto: amount,
      cuenta: account
    };
    this.onPayment.emit(data);
  }
  createAccount(){
    const data = {
        monto: this.amountNew
    };
    this.oncreateAccount.emit(data);
  }
  decimalNumber(){
    this.amountNew = Number.parseFloat(this.amountNew).toFixed(2);
  }

}
