import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../_services/cheeses.service';
import { CartService } from '../_services/cart.service';
import {MatDialog,MatDialogConfig,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CheeseDetailsComponent } from './cheese-details/cheese-details.component';

@Component({
  selector: 'app-cheeses-tab',
  templateUrl: './cheeses-tab.component.html',
  styleUrls: ['./cheeses-tab.component.css'],
})
export class CheesesTabComponent implements OnInit {
  cheeses: [] = [];
  products: [] = [];

  contentLoadedSups: boolean = false;
  contentLoadedProds: boolean = false;
  _currency = 'CDF';
  serverMsg: string;
  errorMsg: any;
  currency: Object;
  constructor(
    private productService: ProductsService,
    private cartService: CartService,
    public dialog:MatDialog
  ) {}

  ngOnInit() {
    //fetch products
    this.productService.getCheeses().subscribe((prods) => {
      this.products = prods;
      this.contentLoadedProds = true;
    });
  }

  //Add to cart function
  addToCart(id: number) {
    this.cartService.AddProductToCart(id);
  }

  //View cheese details for each items
  cheese_details(cheese: object){
    var dialogConfig = new MatDialogConfig();
    dialogConfig.data=cheese;
    const dialogRef = this.dialog.open(CheeseDetailsComponent,dialogConfig);
  }
   
  
}
