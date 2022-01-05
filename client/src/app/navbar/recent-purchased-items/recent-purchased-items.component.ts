import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PurchasedItems } from 'src/app/_models/purchasedItems';

@Component({
  selector: 'app-recent-purchased-items',
  templateUrl: './recent-purchased-items.component.html',
  styleUrls: ['./recent-purchased-items.component.css']
})
export class RecentPurchasedItemsComponent implements OnInit {
  purchasedItemsCount: number
  constructor(@Inject(MAT_DIALOG_DATA) public purchasedItemslist: PurchasedItems[], public dialogRef: MatDialogRef<RecentPurchasedItemsComponent>) { }

  ngOnInit(): void {
    this.purchasedItemsCount = this.purchasedItemslist.length
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
