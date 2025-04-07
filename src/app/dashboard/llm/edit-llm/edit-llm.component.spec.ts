import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLlmComponent } from './edit-llm.component';

describe('EditLlmComponent', () => {
  let component: EditLlmComponent;
  let fixture: ComponentFixture<EditLlmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditLlmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLlmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
