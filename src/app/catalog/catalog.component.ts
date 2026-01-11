import { Component, inject } from '@angular/core';
import { IProduct } from './product.model';
import { CartService } from '../cart/cart.service';
import { ProductService } from './product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
  products: any;
  filter: string = '';
  //private cartSrvc: CartService = inject(CartService);

  constructor(private cartSrvc: CartService, private productSrvc: ProductService, 
    private router: Router, private route: ActivatedRoute){
    
  }

ngOnInit(){
    this.productSrvc.getProducts().subscribe(products=>{
      this.products = products;
    });
    //this.filter = this.route.snapshot.params['filter'];
    this.route.queryParams.subscribe((params)=>{
      this.filter = params['filter'] ?? '';
    })
  }

  getFilteredProducts(){
    return this.filter == '' 
    ? this.products
    : this.products.filter((product: any)=>product.category===this.filter);
  }

  getDiscountedClasses(product: IProduct){
    if(product.discount>0){
      return 'strikethrough';
    }else{
      return '';
    }
  }

  addToCart(product: IProduct){
    this.cartSrvc.add(product);
    this.router.navigate(['/cart'])
   }
}
