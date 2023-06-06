import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDeckModalContentComponent } from './create-deck-modal-content.component';

describe('DeckModalContentComponent', () => {
  let component: CreateDeckModalContentComponent;
  let fixture: ComponentFixture<CreateDeckModalContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDeckModalContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDeckModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
