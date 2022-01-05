import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentPurchasedItemsComponent } from './recent-purchased-items.component';

describe('RecentPurchasedItemsComponent', () => {
  let component: RecentPurchasedItemsComponent;
  let fixture: ComponentFixture<RecentPurchasedItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentPurchasedItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentPurchasedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
