import { Component, OnInit,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  message: string = "Hello Angular!"
  @Output() messageEvent = new EventEmitter<string>();
  constructor() { }
  count
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
