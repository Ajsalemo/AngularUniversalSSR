import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentEntrypointComponent } from './content-entrypoint.component';

describe('ContentEntrypointComponent', () => {
  let component: ContentEntrypointComponent;
  let fixture: ComponentFixture<ContentEntrypointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentEntrypointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentEntrypointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
