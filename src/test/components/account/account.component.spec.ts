import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { AccountComponent } from 'src/app/portal/components/account/account.component';


describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountComponent ],
      imports: [
        MatIconModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should run searchPaymentList() ', () => {
    const id = 'xxx';
    component.onsearchPaymentList = component.onsearchPaymentList || {};
    spyOn(component.onsearchPaymentList, 'emit');
    component.searchPaymentList(id);
    expect(component.onsearchPaymentList.emit).toHaveBeenCalled();
  });
  it('should run payment() ', () => {
    const amount = '50000';
    const account = 'xxx';
    component.onPayment = component.onPayment || {};
    spyOn(component.onPayment, 'emit');
    component.payment(amount, account);
    expect(component.onPayment.emit).toHaveBeenCalled();
  });
  it('should run createAccount() ', () => {
    component.oncreateAccount = component.oncreateAccount || {};
    spyOn(component.oncreateAccount, 'emit');
    component.createAccount();
    expect(component.oncreateAccount.emit).toHaveBeenCalled();
  });
  it('should run decimalNumber() if amountNew is different to null ', () => {
    component.amountNew = '50000';
    component.decimalNumber();
  });
  it('should run decimalNumber() if amountNew is null  ', () => {
    component.amountNew = '';
    component.decimalNumber();
  });

});
