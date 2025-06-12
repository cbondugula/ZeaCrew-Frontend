import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewToolsComponent } from './new-tools.component';

describe('NewToolsComponent', () => {
  let component: NewToolsComponent;
  let fixture: ComponentFixture<NewToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewToolsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
