import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeployTemplateComponent } from './deploy-template.component';

describe('DeployTemplateComponent', () => {
  let component: DeployTemplateComponent;
  let fixture: ComponentFixture<DeployTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeployTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeployTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
