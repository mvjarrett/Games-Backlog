import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IgdbGameComponent } from './igdb-game.component';

describe('IgdbGameComponent', () => {
  let component: IgdbGameComponent;
  let fixture: ComponentFixture<IgdbGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IgdbGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IgdbGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
