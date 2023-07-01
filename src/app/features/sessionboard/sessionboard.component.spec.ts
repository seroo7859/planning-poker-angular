import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionboardComponent } from './sessionboard.component';

describe('DashboardComponent', () => {
  let component: SessionboardComponent;
  let fixture: ComponentFixture<SessionboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
