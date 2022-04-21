import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenGamesComponent } from './ten-games.component';

describe('TenGamesComponent', () => {
  let component: TenGamesComponent;
  let fixture: ComponentFixture<TenGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenGamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
