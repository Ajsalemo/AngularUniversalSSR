import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileBottomMainNavComponent } from './mobile-bottom-main-nav.component';

describe('MobileBottomMainNavComponent', () => {
  let component: MobileBottomMainNavComponent;
  let fixture: ComponentFixture<MobileBottomMainNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileBottomMainNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileBottomMainNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
