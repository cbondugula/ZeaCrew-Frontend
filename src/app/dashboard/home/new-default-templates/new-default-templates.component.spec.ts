import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDefaultTemplatesComponent } from './new-default-templates.component';

describe('NewDefaultTemplatesComponent', () => {
  let component: NewDefaultTemplatesComponent;
  let fixture: ComponentFixture<NewDefaultTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewDefaultTemplatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewDefaultTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
