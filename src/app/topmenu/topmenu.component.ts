import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductoService } from './../producto/producto.service'
@Component({
	selector: 'app-topmenu',
	templateUrl: './topmenu.component.html',
	styleUrls: ['./topmenu.component.css']
})
export class TopmenuComponent implements OnInit {
	message: string = "Hello Angular!"
	perfil = "1"
	@Output() messageEvent = new EventEmitter<string>();
	constructor() { }
	count = null
	ngOnInit() {


	}

}
