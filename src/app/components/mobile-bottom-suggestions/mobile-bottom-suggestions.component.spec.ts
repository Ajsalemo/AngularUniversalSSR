import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileBottomSuggestionsComponent } from './mobile-bottom-suggestions.component';

describe('MobileBottomSuggestionsComponent', () => {
  let component: MobileBottomSuggestionsComponent;
  let fixture: ComponentFixture<MobileBottomSuggestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileBottomSuggestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileBottomSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
