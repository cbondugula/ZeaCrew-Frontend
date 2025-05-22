import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAgentTaskComponent } from './edit-agent-task.component';

describe('EditAgentTaskComponent', () => {
  let component: EditAgentTaskComponent;
  let fixture: ComponentFixture<EditAgentTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditAgentTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAgentTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
