import { Injectable } from '@angular/core';
import { ProductsService } from './cheeses.service';
import { CartModelPublic } from '../_models/cart';
import { Cheese } from '../_models/cheese';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { PurchasedItems } from '../_models/purchasedItems';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class CartService {
  //Data variable to store the cart information on the client's local storage
  private cartDataClient: CartModelPublic = {};
  private server_url = environment.serverURL;

  /*OBSERVABLES FOR THE COMPONENT TO SUBSCRIBE */
  cartTotals$ = new BehaviorSubject<number>(0);
  cartDataObs$ = new BehaviorSubject<CartModelPublic>(this.cartDataClient);
  productData$ = new BehaviorSubject<Cheese[]>([]);
  purchasedItems$ = new BehaviorSubject<PurchasedItems[]>([]);




  constructor(private productsService: ProductsService, private http: HttpClient) {
    //fetch cheeses
    this.productsService.getCheeses().subscribe((prods) => {
      this.productData$.next(prods);

    });
    this.getPurchasedItems().subscribe((purchasedItems) => {
      this.purchasedItems$.next(purchasedItems);

    });
  }

  AddProductToCart(id: Number) {
    // if not in cart
    const stringID = id.toString();
    if (this.cartDataClient[stringID] === undefined) {
      // add to cart
      this.cartDataClient[stringID] = 1;
    } else {
      this.cartDataClient[stringID]++;
    }
    this.cartDataObs$.next(this.cartDataClient);

  }

  // For incrementing and decrementing items in the cart
  // if count is positive, increment, otherwise decrement
  ModifyProductCount(id: string, count: number) {
    if (count > 0) {
      this.cartDataClient[id]++;
      this.cartDataObs$.next(this.cartDataClient);
      return;
    }

    // subtract one
    if (this.cartDataClient[id] > 1) {
      this.cartDataClient[id]--;
      this.cartDataObs$.next(this.cartDataClient);
      return;
    }

    delete this.cartDataClient[id];
    this.cartDataObs$.next(this.cartDataClient);
  }

  //Saves the cheeses purchased from cart and returns the purchaseItems object
  SavePurchasedItems(totalPrice: number, purchasedCheeseDetails: object): Observable<PurchasedItems> {

    var purchasedCheeseItemsList = [];
    var currentDate = new Date();
    Object.entries(purchasedCheeseDetails).forEach(entry => {
      var cheeseDetails = {
        id: entry[0],
        cheeseQty: entry[1]
      }
      purchasedCheeseItemsList.push(cheeseDetails)
    });
    var purchasedItems: PurchasedItems = {
      purchaseId: 0,
      purchaseDate: currentDate.getDate(),
      cheeseDetails: purchasedCheeseItemsList,
      totalPrice: Number(totalPrice.toFixed(2))

    };
    console.log(purchasedItems)
    return this.http.post<PurchasedItems>(this.server_url + '/PurchasedItems/SavePurchaseItem', purchasedItems, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(this.handleError));

  }

  // This method retrieves all the recent purchased cheese items
  getPurchasedItems(): Observable<any> {
    return this.http.get(this.server_url + '/PurchasedItems/GetPurchaseList').pipe(
      catchError(this.handleError));;
  }
  //This method handles the http response Error and prints in the console
  handleError(error: HttpErrorResponse) {
    console.error("Error:", error.status);
    console.error("Error:", error.statusText);
    return throwError(error);
  }
}
