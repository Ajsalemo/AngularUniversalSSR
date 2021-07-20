import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavOptionsComponent } from './sidenav-options.component';

describe('SidenavOptionsComponent', () => {
  let component: SidenavOptionsComponent;
  let fixture: ComponentFixture<SidenavOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
