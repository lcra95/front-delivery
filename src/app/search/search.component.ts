import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

	@Output() messageEvent = new EventEmitter<string>();
	constructor(private router: Router) { }
	count
	search
	ngOnInit() {
		if (!sessionStorage.getItem("cart")) {
			var cart = [];
			sessionStorage.setItem("cart", JSON.stringify(cart))

		} else {
			var self = this
			setInterval(function () {
				self.count = JSON.parse(sessionStorage.getItem("cart")).length
			}, 500);


		}
	}
	sendMessage() {

		this.messageEvent.emit(this.search)
	}
	carrito(){
		this.router.navigate(['/cart'] );
	}
}
