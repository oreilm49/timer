import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEditPopoverComponent } from './task-edit-popover.component';

describe('TaskEditPopoverComponent', () => {
  let component: TaskEditPopoverComponent;
  let fixture: ComponentFixture<TaskEditPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskEditPopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskEditPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
