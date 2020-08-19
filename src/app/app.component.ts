import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'front-delivery';
  cart
  ngOnInit() {
		if(sessionStorage.getItem("cart")){
			var cart = JSON.parse(sessionStorage.getItem("cart"))
      this.cart = cart.length
		}
    
	}
}
