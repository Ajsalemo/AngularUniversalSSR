import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RightSidenavTitleComponent } from './right-sidenav-title.component';

describe('RightSidenavTitleComponent', () => {
  let component: RightSidenavTitleComponent;
  let fixture: ComponentFixture<RightSidenavTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RightSidenavTitleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RightSidenavTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
