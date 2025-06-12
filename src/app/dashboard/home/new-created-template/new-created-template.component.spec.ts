import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCreatedTemplateComponent } from './new-created-template.component';

describe('NewCreatedTemplateComponent', () => {
  let component: NewCreatedTemplateComponent;
  let fixture: ComponentFixture<NewCreatedTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewCreatedTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCreatedTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
