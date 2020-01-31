import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { products } from '../products';

interface DataResponse {
  visibility: number;
  id: number;
  title: string;
  completed: boolean;
}


@Injectable({
  providedIn: 'root'
})


export class CartService {

   items = [];
    myMap: Record<number, number> = {};
  constructor(private http: HttpClient) { }

  addToCart(product) {
    this.items.push(product);
    console.log(product);
    if(this.myMap[product.idOfProduct]){
      this.myMap[product.idOfProduct]=this.myMap[product.idOfProduct]+1;
    } else {
      this.myMap[product.idOfProduct]=1;
    }
    
    console.log(this.myMap);
  }

  getItems() {
    return this.items;
  }

  getItemsMap(){
    return this.myMap;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  clearCartMap(){
    this.myMap={};
  }

  deleteItem(index){
    this.items.splice(index,1);
  }

  deleteItemMap(index){
    this.myMap[index]--;
  }

  getShippingPrices() {
    
    var tempArray: DataResponse[] = [];
    this.http.get('https://dog.ceo/api/breeds/image/random').subscribe(
      data => {
        console.log(data);
                for (var i=0; i<10; i++)  
                  tempArray.push(<DataResponse>data[i]);     
              },
      error=> { 
                console.log(error); 
              },
      ()   => {
                console.log( tempArray[0] );
              }
    );
    // console.log(tempArray);
    // console.log(tempArray);
      
    
    // console.log(this.http.get('https://samples.openweathermap.org/data/2.5/weather?lat=35&lon=139&// appid=b6907d289e10d714a6e88b30761fae22', {observe: 'response'}));
    return this.http.get('/assets/shipping.json');
  }

}