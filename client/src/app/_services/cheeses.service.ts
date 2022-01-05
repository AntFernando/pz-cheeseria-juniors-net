import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private server_url = environment.serverURL;

  constructor(private http: HttpClient) { }

  getCheeses(): Observable<any> {
    return this.http.get(this.server_url + '/cheeses');
  }


}
