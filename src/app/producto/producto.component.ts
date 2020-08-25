import { Component, OnInit } from '@angular/core';
import { ProductoService } from './producto.service'
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
	selector: 'app-producto',
	templateUrl: './producto.component.html',
	styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

	
	constructor(private ProductoService: ProductoService, private router: Router) { }
	productos
	pro
	cantidad
	count
	tipos
	cart
	message
	ngOnInit() {

		var params = null
		if(!sessionStorage.getItem("cart")){
			var cart = [];
			sessionStorage.setItem("cart",JSON.stringify(cart))
			
		}
		this.ProductoService.getTipoProductos().subscribe(data => {
			this.tipos = data['response'].data.info;
			
		});
		this.ProductoService.getProductos(params).subscribe(data => {
			this.productos = data['response'].data.info;
			this.count = data['response'].data.info.length	

		});
	}
	agregarProducto(prod){
		var sub_total = prod.precio * prod.cantidad
		var agcart = {
			"id": prod.id,
			"nombre" : prod.nombre,
			"precio" : prod.precio,
			"precio_bruto": prod.fix_precio_bruto * prod.cantidad,
			"cantidad" : prod.cantidad,
			"sub_total" : sub_total,
			"detalle" : {},
			"descripcion": prod.descripcion,
			"imagen": prod.imagen,
			"iva" : prod.fix_iva * prod.cantidad,
			"fix_iva" : prod.fix_iva,
			"fix_bruto": prod.fix_precio_bruto
		}
		
		var cart = JSON.parse(sessionStorage.getItem("cart"));
		cart.push(agcart)
		sessionStorage.setItem("cart",JSON.stringify(cart))
		swal({
			title : "Producto Agregado",
			timer : 1500,
			icon: "success"
		})
		
		
	}
	verDetalle(prod){
		
		var detalle = prod.id
		
		this.router.navigate(['/detalle', {data : detalle}] );
		
	}
	filter(filtro = null, nombre = null){

		var params = {}
		if (filtro){
			params["id_tipo_producto"]= filtro
		}
		if(nombre){
			params["nombre"]= nombre
		}
		this.ProductoService.getTipoProductos().subscribe(data => {
			this.tipos = data['response'].data.info;
			
		});
		this.ProductoService.getProductos(params).subscribe(data => {
			this.productos = data['response'].data.info;
			this.count = data['response'].data.info.length	

		});
	}
	receiveMessage($event) {
		this.message = $event
		this.filter(null, this.message )
	}
}