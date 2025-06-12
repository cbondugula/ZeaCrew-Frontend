import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLlmComponent } from './new-llm.component';

describe('NewLlmComponent', () => {
  let component: NewLlmComponent;
  let fixture: ComponentFixture<NewLlmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewLlmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewLlmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
