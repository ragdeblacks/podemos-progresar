import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlEnum } from '../enums/url.enum';
import { ConnectionService } from './connection.service';



@Injectable({
  providedIn: 'root'
})
export class TransactionService extends ConnectionService {

  constructor(public http: HttpClient) {
    super(http);
  }

  getCustomers(): Observable<any> {
    return this.get(UrlEnum.customer);
  }
  getCustomerbyId(id: any): Observable<any> {
    return this.get(UrlEnum.customer+'/'+id);
  }
  getGroups(): Observable<any> {
    return this.get(UrlEnum.group);
  }
  getGroupbyId(id: any): Observable<any> {
    return this.get(UrlEnum.group);
  }
  getGroupMembers(idGroup: any): Observable<any> {
    return this.get(UrlEnum.group+'/'+idGroup+'/'+UrlEnum.member);
  }
  getGroupAccounts(idGroup: any): Observable<any> {
    return this.get(UrlEnum.group+'/'+idGroup+'/'+UrlEnum.account);
  }
  getAccounts(): Observable<any> {
    return this.get(UrlEnum.account);
  }
  getAccountbyId(id: any): Observable<any> {
    return this.get(UrlEnum.account+'/'+id);
  }
  getAccountPaymentCalendar(id: any): Observable<any> {
    return this.get(UrlEnum.account+'/'+id+'/'+UrlEnum.paymentCalendar);
  }
  getAccountTransaction(id: any): Observable<any> {
    return this.get(UrlEnum.account+'/'+id+'/'+UrlEnum.transaction);
  }

  setCustomer(payload: any): Observable<any> {
    return this.post(UrlEnum.customer+'/'+UrlEnum.new,payload);
  }
  setGroup(payload: any): Observable<any> {
    return this.post(UrlEnum.group+'/'+UrlEnum.new,payload);
  }
  setGroupMember(idGroup: any,payload: any): Observable<any> {
    return this.post(UrlEnum.group+'/'+idGroup+'/'+UrlEnum.member+'/'+UrlEnum.new,payload);
  }
  setGroupAccount(idGroup: any,payload: any): Observable<any> {
    return this.post(UrlEnum.group+'/'+idGroup+'/'+UrlEnum.account+'/'+UrlEnum.new,payload);
  }
  setAccountPayment(idAccount: any,payload: any): Observable<any> {
    return this.post(UrlEnum.account+'/'+idAccount+'/'+UrlEnum.payment+'/'+UrlEnum.new,payload);
  }
}
