import { Component } from '@angular/core';

import { CartService } from '../cart.service';
import { HttpClient } from '@angular/common/http';
import { products } from '../products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products = products;
  randomDogImage;

  constructor(private cartService: CartService, private http: HttpClient){

  }

  ngOnInit() {
     this.http.get('https://dog.ceo/api/breeds/image/random').subscribe(
      data => {
        console.log(data.message);
              this.randomDogImage = data.message;
              },
      error=> { 
                console.log(error); 
              },
      ()   => {
                
              }
    );
  }
  

  share() {
    window.alert('The product has been shared!');
  }
  onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }

  buy(productId){
    const myMap: Record<string, number> = {};
    // myMap["foo"] = "1";
    // myMap["bar"] = "2";
  console.log(myMap);

    console.log(products[productId]);
   this.cartService.addToCart(products[productId]);
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/