import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalventaComponent } from './modalventa/modalventa.component';
import { Stock } from '../const/productos';
@Component({
	selector: 'app-ventarapida',
	templateUrl: './ventarapida.component.html',
	styleUrls: ['./ventarapida.component.css']
})
export class VentarapidaComponent implements OnInit {
	bsModalRef: BsModalRef;
	menus
	bebidas
	items = 5
	constructor(private modalService: BsModalService,) { }

	ngOnInit() {
		this.menus = this.getProductos(1);
		this.bebidas = this.getProductos(2)
		
	}
	agregar(object){
		const initialState = object
		this.bsModalRef = this.modalService.show(ModalventaComponent, {initialState});
		if(object.opciones.length == 0){
			
		}
		// swal({
		// 	title : "Producto Agregado",
		// 	timer : 1000,
		// 	icon: "success"
		// })
	}
	getProductos(index) {
		var productos = Stock.prod
		if(index == 1){
			return productos.menu
		}
		// else if(index == 2){
		// 	return productos.bebidas
		// }
	}

}
