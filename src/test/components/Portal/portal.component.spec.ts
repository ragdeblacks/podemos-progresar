import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TransactionService } from 'src/app/core/service/transaction.service';
import { PortalComponent } from 'src/app/portal/portal.component';

@Injectable()
export class MockTransactionService {
    // tslint:disable-next-line: typedef
    getCustomers() {
      return of({});
    }
    // tslint:disable-next-line: typedef
    getCustomerbyId(id: any) {
      return of({});
    }
    // tslint:disable-next-line: typedef
    getGroups() {
      return of({});
    }
    // tslint:disable-next-line: typedef
    getGroupbyId(id: any) {
      return of({});
    }
    // tslint:disable-next-line: typedef
    getGroupAccounts(idGroup: any) {
      return of({});
    }
    // tslint:disable-next-line: typedef
    getAccounts() {
      return of({});
    }
    // tslint:disable-next-line: typedef
    getGroupMembers(idGroup: any) {
      return of({});
    }
    // tslint:disable-next-line: typedef
    getAccountbyId(id: any) {
      return of({});
    }
    // tslint:disable-next-line: typedef
    getAccountPaymentCalendar(id: any) {
      return of({});
    }
    // tslint:disable-next-line: typedef
    getAccountTransaction(id: any) {
      return of({});
    }
    // tslint:disable-next-line: typedef
    setCustomer(payload: any) {
      return of({});
    }
    // tslint:disable-next-line: typedef
    setGroup(payload: any) {
      return of({});
    }
    // tslint:disable-next-line: typedef
    setGroupMember(idGroup: any, payload: any) {
      return of({});
    }
    // tslint:disable-next-line: typedef
    setGroupAccount(idGroup: any, payload: any) {
      return of({});
    }
    // tslint:disable-next-line: typedef
    setAccountPayment(idAccount: any, payload: any) {
      return of({});
    }
    // tslint:disable-next-line: typedef
    get statusSetAccount$() {
        return of({});
    }
    // tslint:disable-next-line: typedef
    get statusSearchGroupAccount$() {
      return of({});
  }
    // tslint:disable-next-line: typedef
    get statusSearchPayment$() {
        return of({});
    }
}

describe('PortalComponent', () => {
  let component: PortalComponent;
  let fixture: ComponentFixture<PortalComponent>;
  let store: any = {
    step: '1',
    idCustomer: 'X1',
    nameCustomer: 'Juan',
    idGroup: 'Y1',
    nameGroup: 'GroupTest',
    typeAffiliate: '1',
    countCred: '1',
    listCredits: JSON.stringify({})
  };
  const mockLocalStorage = {
    getItem: (key: string): string => {
      return key in store ? store[key] : null;
    },
    setItem: (key: string, value: string) => {
      store[key] = `${value}`;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortalComponent ],
      imports: [
        HttpClientModule
      ],
      providers: [
        { provide: TransactionService, useClass: MockTransactionService },
      ]
    })
    .compileComponents();

    spyOn(localStorage, 'getItem')
    .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should run ngOnInit() ', () => {
    component.ngOnInit();
    expect(localStorage.getItem('step')).toEqual('1');
  });
  it('should run saveGroup() ', () => {
    const res = {
      name: 'TestGroup',
      id: 'X1'
    };
    const step = 1;
    spyOn(component, 'changeStep');
    component.saveGroup(res, step);
    expect(component.changeStep).toHaveBeenCalled();
  });
  it('should run saveCustomer() ', () => {
    const res = {
      name: 'Juan',
      id: 'X1'
    };
    const step = 1;
    spyOn(component, 'changeStep');
    component.saveCustomer(res, step);
    expect(component.changeStep).toHaveBeenCalled();
  });
  it('should run getGroups() ', () => {
    component.getGroups();
  });
  it('should run getCustomer() ', () => {
    component.getCustomer();
  });
  it('should run setGroups() ', () => {
    const data: any = {
      id: 'X1',
      name: 'TestGroup'
    };
    component.setGroups(data);
  });
  it('should run setCustomer() ', () => {
    const data: any = {
      id: 'X1',
      name: 'Juan'
    };
    component.setCustomer(data);
  });
  it('should run changeModule() ', () => {
    const data = {
      view: 'group'
    };
    spyOn(component, 'getGroups');
    component.changeModule(data);
    expect(component.getGroups).toHaveBeenCalled();
  });
  it('should run changeModule() ', () => {
    const data = {
      view: 'client'
    };
    spyOn(component, 'getCustomer');
    component.changeModule(data);
    expect(component.getCustomer).toHaveBeenCalled();
  });
  it('should run searchCustomer() ', () => {
    const data = {
      id: 'X1',
      name: 'Juan'
    };
    component.searchCustomer(data);
  });
  it('should run payment() ', () => {
    const data = {
      cuenta: 'Credit-1',
      monto: '5000'
    };
    spyOn(component, 'getGroupAccount');
    component.payment(data);
    expect(component.getGroupAccount).toHaveBeenCalled();
  });
  it('should run setGroupAccount() ', () => {
    const payload = {
      name: 'Credit'
    };
    component.localInfo.idGroup = '1';
    component.setGroupAccount(payload);
  });
  it('should run randomId() ', () => {
    component.randomId();
  });
  it('should run searchGroup() ', () => {
    const data = {
      name: 'TestGroup'
    };
    component.searchGroup(data);
  });
  it('should run creationProcess() when step equal to 2 ', () => {
    const data = {
      step: 2
    };
    spyOn(component, 'changeStep');
    component.creationProcess(data);
    expect(component.changeStep).toHaveBeenCalled();
  });
  it('should run creationProcess() when step equal to 3 and if typeCustomer is crear', () => {
    const data = {
      step: 3,
      id: '',
      name: 'Juan'
    };
    component.typeCustomer = 'crear';
    spyOn(component, 'setCustomer');
    component.creationProcess(data);
    expect(component.setCustomer).toHaveBeenCalled();
  });
  it('should run creationProcess() when step equal to 3 and if typeCustomer is different of crear', () => {
    const data = {
      step: 3,
      id: '',
      name: 'Juan'
    };
    component.typeCustomer = '';
    spyOn(component, 'changeStep');
    component.creationProcess(data);
    expect(component.changeStep).toHaveBeenCalled();
  });

  it('should run creationProcess() when step equal to 4 ', () => {
    const data = {
      step: 4,
      id: 'X1',
      name: 'Juan',
      optionGroup: '1'
    };
    component.localInfo.idCustomer = 'X1';
    spyOn(component, 'changeStep');
    component.creationProcess(data);
    expect(component.changeStep).toHaveBeenCalled();
  });
  it('should run creationProcess() when step equal to 5, typeAffiliate equal with 2 and amount is different from 0  ', () => {
    const data = {
      step: 5,
      id: 'X1',
      name: 'Juan',
      optionGroup: '1'
    };
    component.typeAffiliate = '2';
    component.amount = 1;
    spyOn(component, 'createAccount');
    spyOn(component, 'searchGroupAccount');
    component.creationProcess(data);
    expect(component.createAccount).toHaveBeenCalled();
    expect(component.searchGroupAccount).toHaveBeenCalled();
  });
  it('should run creationProcess() when step equal to 5, typeAffiliate equal with 2 and amount is  0  ', () => {
    const data = {
      step: 5,
      id: 'X1',
      name: 'Juan',
      optionGroup: '1'
    };
    component.typeAffiliate = '2';
    component.amount = 0;
    spyOn(component, 'searchGroupAccount');
    component.creationProcess(data);
    expect(component.searchGroupAccount).toHaveBeenCalled();
  });
  it('should run createAccount() ', () => {
    const data = {
      cuenta: 'Credit-1',
      monto: '5000'
    };
    spyOn(component, 'setGroupAccount');
    component.createAccount(data);
    expect(component.setGroupAccount).toHaveBeenCalled();
  });
});
