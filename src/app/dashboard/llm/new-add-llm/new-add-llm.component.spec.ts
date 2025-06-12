import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAddLlmComponent } from './new-add-llm.component';

describe('NewAddLlmComponent', () => {
  let component: NewAddLlmComponent;
  let fixture: ComponentFixture<NewAddLlmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewAddLlmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAddLlmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
