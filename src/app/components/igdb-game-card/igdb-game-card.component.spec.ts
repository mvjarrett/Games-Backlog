import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IgdbGameCardComponent } from './igdb-game-card.component';

describe('IgdbGameCardComponent', () => {
  let component: IgdbGameCardComponent;
  let fixture: ComponentFixture<IgdbGameCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IgdbGameCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IgdbGameCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
