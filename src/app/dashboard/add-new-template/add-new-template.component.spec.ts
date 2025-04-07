import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewTemplateComponent } from './add-new-template.component';

describe('AddNewTemplateComponent', () => {
  let component: AddNewTemplateComponent;
  let fixture: ComponentFixture<AddNewTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNewTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
