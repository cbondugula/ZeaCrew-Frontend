import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLlmComponent } from './add-llm.component';

describe('AddLlmComponent', () => {
  let component: AddLlmComponent;
  let fixture: ComponentFixture<AddLlmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddLlmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLlmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
