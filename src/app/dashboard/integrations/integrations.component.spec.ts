import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IntegrationsComponent } from './integrations.component';

describe('IntegrationsComponent', () => {
  let component: IntegrationsComponent;
  let fixture: ComponentFixture<IntegrationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IntegrationsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IntegrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 default integrations', () => {
    expect(component.integrations.length).toBe(3);
  });

  it('should delete an integration', () => {
    component.onDeleteIntegration('Slack');
    expect(component.integrations.find(i => i.name === 'Slack')).toBeUndefined();
  });

  it('should mark an integration as connected', () => {
    component.connectIntegration('Zapier');
    const zapier = component.integrations.find(i => i.name === 'Zapier');
    expect(zapier?.connected).toBeTrue();
  });

  it('should detect if there is an integration with error', () => {
    expect(component.hasErrorIntegration()).toBeTrue();
  });

  it('should return false if no integration has error', () => {
    component.integrations.forEach(i => i.hasError = false);
    expect(component.hasErrorIntegration()).toBeFalse();
  });
});
