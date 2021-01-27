import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderComponent } from 'src/app/component/header/header.component';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        MatIconModule,
        MatMenuModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should run changeModule() ', () => {
    const view = '1';
    component.onchangeModule = component.onchangeModule || {};
    spyOn(component.onchangeModule, 'emit');
    component.changeModule(view);
    expect(component.onchangeModule.emit).toHaveBeenCalled();
  });
});
