import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductoService } from './../producto/producto.service'
@Component({
	selector: 'app-topmenu',
	templateUrl: './topmenu.component.html',
	styleUrls: ['./topmenu.component.css']
})
export class TopmenuComponent implements OnInit {
	message: string = "Hello Angular!"

	@Output() messageEvent = new EventEmitter<string>();
	constructor() { }
	count = null
	ngOnInit() {
		if(!sessionStorage.getItem("cart")){
			var cart = [];
			sessionStorage.setItem("cart",JSON.stringify(cart))
			
		}else{
			var self = this
			setInterval(function(){ 
				self.count = JSON.parse(sessionStorage.getItem("cart")).length 
			}, 500);
			
					
		}

	}
	sendMessage() {
		this.messageEvent.emit(this.message)
	}
}
