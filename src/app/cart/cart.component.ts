import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, FormControl, Validators } from '@angular/forms';
import { CartService } from '../cart.service';
 import {Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items; checkoutForm; router: Router;
  itemsMap;
username = new FormControl('', [
    Validators.required,
    Validators.minLength(5)
  ]);

  password = new FormControl('', [Validators.required]);
  loginForm: FormGroup = this.formBuilder.group({
    username: this.username,
    password: this.password
  });
  
  constructor(
    
    _router: Router,
    private cartService: CartService,
    private formBuilder: FormBuilder,
  ) { 
     this.router = _router;
    // this.checkoutForm = this.formBuilder.group({
    //   name: this.username,
    //   address: this.password
    // });
  }

  ngOnInit() {
  this.items = this.cartService.getItems();
 //this.items = this.cartService.getItemsMap();

  }

  deleteFromCart(index){
    console.log(index);
     this.cartService.deleteItem(index);
     this.items = this.cartService.getItems();
     this.itemsMap = this.cartService.getItemsMap();
  }

  login(){

  }

  onSubmit(customerData) {
    // Process checkout data here
  
  //  console.log(customerData);
  //  console.log(typeof this.loginForm);
  //  console.log(this.loginForm.controls.username);

    if(customerData.username=="lukaluka"){
      alert('Your order has been submitted, '+ customerData.username);
      this.items = this.cartService.clearCart();
    
      this.router.navigateByUrl('/products');
    } else {
      this.loginForm.setErrors({notEquivalent: true});
    }
    
  }

  usernameExists(username):boolean{
    return false;
  }

}