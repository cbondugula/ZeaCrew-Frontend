import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildTemplateComponent } from './build-template.component';

describe('BuildTemplateComponent', () => {
  let component: BuildTemplateComponent;
  let fixture: ComponentFixture<BuildTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuildTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
