import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IgdbResultsComponent } from './igdb-results.component';

describe('IgdbResultsComponent', () => {
  let component: IgdbResultsComponent;
  let fixture: ComponentFixture<IgdbResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IgdbResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IgdbResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
