import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateEnvComponent } from './template-env.component';

describe('TemplateEnvComponent', () => {
  let component: TemplateEnvComponent;
  let fixture: ComponentFixture<TemplateEnvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TemplateEnvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateEnvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
