import { Injectable } from '@angular/core';
import { IProduct } from '../catalog/product.model';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  // cart: IProduct[] = [];
  private cart: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([]);

  constructor(private http: HttpClient) {
    this.http.get<IProduct[]>('https://localhost:7068/api/cart').subscribe({
      next: (cart) => this.cart.next(cart),
    });
   }

  add(product: IProduct){
    const newCart = [...this.cart.getValue(), product];
    this.cart.next(newCart);
    this.http.post('https://localhost:7068/api/cart', newCart).subscribe(()=>{
    console.log(`product ${product.name} added to cart.`);
    });
  }

  getCart(): Observable<IProduct[]> {
    return this.cart.asObservable();
  }

  remove(product: IProduct) {
    let newCart = this.cart.getValue().filter((i) => i !== product);
    this.cart.next(newCart);
    this.http.post('/api/cart', newCart).subscribe(() => {
      console.log('removed ' + product.name + ' from cart!');
    });
  }
}
