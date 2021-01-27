import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from 'src/app/portal/components/user/user.component';


describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should run clear() ', () => {
    component.clear();
  });
  it('should run searchCustomer() if nameCustomer is diferent to null ', () => {
    component.nameCustomer = 'Juan';
    component.onsearchCustomer = component.onsearchCustomer || {};
    spyOn(component.onsearchCustomer, 'emit');
    component.searchCustomer();
    expect(component.onsearchCustomer.emit).toHaveBeenCalled();
  });
  it('should run searchCustomer() if nameCustomer null ', () => {
    component.nameCustomer = '';
    component.searchCustomer();
  });
  it('should run creationProcess() ', () => {
    const view = 1;
    component.oncreationProcess = component.oncreationProcess || {};
    spyOn(component.oncreationProcess, 'emit');
    component.creationProcess(view);
    expect(component.oncreationProcess.emit).toHaveBeenCalled();
  });
});
