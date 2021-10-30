import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskHeadingComponent } from './task-heading.component';

describe('TaskHeadingComponent', () => {
  let component: TaskHeadingComponent;
  let fixture: ComponentFixture<TaskHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskHeadingComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
