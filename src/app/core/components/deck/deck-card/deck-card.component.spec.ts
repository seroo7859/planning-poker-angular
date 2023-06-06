import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckCardComponent } from './deck-card.component';

describe('FlipCardComponent', () => {
  let component: DeckCardComponent;
  let fixture: ComponentFixture<DeckCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeckCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeckCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
