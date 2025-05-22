import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAgentComponent } from './manager-agent.component';

describe('ManagerAgentComponent', () => {
  let component: ManagerAgentComponent;
  let fixture: ComponentFixture<ManagerAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagerAgentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
