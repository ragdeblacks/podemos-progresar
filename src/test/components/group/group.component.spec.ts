import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { GroupComponent } from 'src/app/portal/components/group/group.component';


describe('GroupComponent', () => {
  let component: GroupComponent;
  let fixture: ComponentFixture<GroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupComponent ],
      imports: [
        MatIconModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should run creationProcess() ', () => {
    const view = 1;
    component.error = {
      nombre: ''
    };
    component.oncreationProcess = component.oncreationProcess || {};
    spyOn(component.oncreationProcess, 'emit');
    component.creationProcess(view);
    expect(component.oncreationProcess.emit).toHaveBeenCalled();
  });
  it('should run changeOptionGroup() if namegroup content ', () => {
    const res = {
      srcElement: {
        value: 'xxx'
      }
    };
    component.nameGroup = 'xxx';
    component.changeOptionGroup(res);
  });
  it('should run changeOptionGroup() if namegroup clear ', () => {
    const res = {
      srcElement: {
        value: 'xxx'
      }
    };
    component.nameGroup = '';
    component.changeOptionGroup(res);
  });

  it('should run searchGroup() ', () => {
    component.onsearchGroup = component.onsearchGroup || {};
    spyOn(component.onsearchGroup, 'emit');
    component.searchGroup();
    expect(component.onsearchGroup.emit).toHaveBeenCalled();
  });

});
