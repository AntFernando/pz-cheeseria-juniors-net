import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheeseDetailsComponent } from './cheese-details.component';

describe('CheeseDetailsComponent', () => {
  let component: CheeseDetailsComponent;
  let fixture: ComponentFixture<CheeseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheeseDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheeseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
