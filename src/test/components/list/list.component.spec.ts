import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from 'src/app/portal/components/list/list.component';


describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should run saveCustomer() ', () => {
    const id = 'xxx';
    component.onsetCustomer = component.onsetCustomer || {};
    spyOn(component, 'closedEdit');
    spyOn(component.onsetCustomer, 'emit');
    component.saveCustomer(id);
    expect(component.onsetCustomer.emit).toHaveBeenCalled();
    expect(component.closedEdit).toHaveBeenCalled();
  });
  it('should run saveGroup() ', () => {
    const id = 'xxx';
    component.onsetGroups = component.onsetGroups || {};
    spyOn(component, 'closedEdit');
    spyOn(component.onsetGroups, 'emit');
    component.saveGroup(id);
    expect(component.onsetGroups.emit).toHaveBeenCalled();
    expect(component.closedEdit).toHaveBeenCalled();
  });
  it('should run createData() if viewMenu is group ', () => {
    component.viewMenu = 'group';
    component.onsetGroups = component.onsetGroups || {};
    spyOn(component.onsetGroups, 'emit');
    spyOn(component, 'closedEdit');
    component.createData();
    expect(component.onsetGroups.emit).toHaveBeenCalled();
    expect(component.closedEdit).toHaveBeenCalled();
  });
  it('should run createData() if viewMenu is client ', () => {
    component.viewMenu = 'client';
    component.onsetCustomer = component.onsetCustomer || {};
    spyOn(component.onsetCustomer, 'emit');
    spyOn(component, 'closedEdit');
    component.createData();
    expect(component.onsetCustomer.emit).toHaveBeenCalled();
    expect(component.closedEdit).toHaveBeenCalled();
  });
  it('should run editCustomer() ', () => {
    const id = 'X1';
    const name = 'Juan';
    component.editCustomer(id, name);
  });
  it('should run editGroup() ', () => {
    const id = 'X1';
    const name = 'TestGroup';
    component.editGroup(id, name);
  });
  it('should run closedEdit() ', () => {
    component.closedEdit();
  });
});
