import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftSidenavOptionsComponent } from './left-sidenav-options.component';

describe('LeftSidenavOptionsComponent', () => {
  let component: LeftSidenavOptionsComponent;
  let fixture: ComponentFixture<LeftSidenavOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftSidenavOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftSidenavOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
