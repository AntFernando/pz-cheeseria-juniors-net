import { Component, OnInit } from '@angular/core';
import { CartService } from '../_services/cart.service';
import { CartModelPublic } from '../_models/cart';
import { Cheese } from '../_models/cheese';
import { PurchasedItems } from '../_models/purchasedItems';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { RecentPurchasedItemsComponent } from './recent-purchased-items/recent-purchased-items.component';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  cartData: CartModelPublic;
  cartSize: number;
  cartTotal: number;
  isPurchasedItemsSaved: boolean;
  _message: string;
  products: Cheese[];
  purchasedItems: PurchasedItems[];
  purchaseHistory: any;
  store: any = [];
  logo: any;

  constructor(private cartService: CartService,
    public dialog: MatDialog) { }

  ngOnInit() {

    // set the products locally
    this.cartService.productData$.subscribe((cheeseData) => {
      this.products = cheeseData;
    });

    this.cartService.purchasedItems$.subscribe((data) => {
      this.purchasedItems = data
    });

    this.cartService.cartDataObs$.subscribe((data) => {
      this.cartData = data;
      this.cartSize = Object.entries(data).reduce(
        (total, val) => total + val[1],
        0
      );
    });
  }


  // Increments the number of items in cart if value is positive,
  // or decrements if negative
  changeItemAmount(id: string, value: number) {
    this.cartService.ModifyProductCount(id, value);
  }

  // returns the details for the specified cheese
  getDetails(id: string): Cheese {
    const details = this.products.filter(
      (product) => product.id === parseInt(id)
    );
    return details[0];
  }

  // calculates the total cart cost
  calculateTotal() {
    this.cartTotal = Object.entries(this.cartData).reduce(
      (total, [key, value]) => total + this.getDetails(key).price * value,
      0
    );
    return this.cartTotal
  }
  //saves all the cart items and returns purchaseItems details to display purchase id in the popup
  savePurchasedItems() {
    this.cartService.SavePurchasedItems(this.cartTotal, this.cartData).toPromise()
      .then(purchasedItems => {
        (<HTMLInputElement>document.getElementById("navbarDropdown")).click();
        (<HTMLInputElement>document.getElementById("btnPurchase")).disabled = true;
        Swal.fire({
          position: 'center',
          icon: purchasedItems!= null ? 'success' : 'error',
          title: purchasedItems!=null ? 'Purchased Successfully' : "Unable to complete the purchase. Please try again later",
          text:  purchasedItems!= null ? 'Your purchase order number is '+purchasedItems.purchaseId  : '',
          showConfirmButton: true,
          allowOutsideClick:false,

        }).then((btnOk) => {
          if (btnOk.isConfirmed) {
            window.location.reload();
          }
        }
        )
      })


  }


  //retrieves all the purchased items from the server and opens the modal dialog
  getAllPurchasedItems() {
    if (this.dialog.openDialogs.length == 0) {
      var dialogConfig = new MatDialogConfig();
      dialogConfig.data = this.purchasedItems;
      dialogConfig.disableClose = false;
      this.purchaseHistory = this.dialog.open(RecentPurchasedItemsComponent, dialogConfig);
    }

  }
}
