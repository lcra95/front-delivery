import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/';
import { ProductoService } from './../producto.service'
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert'
@Component({
	selector: 'app-detalle',
	templateUrl: './detalle.component.html',
	styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
	
	detalle;
	ingredientes
	ing = [];
	cantidad : any
	constructor( private ProductoService: ProductoService, private router: Router, private route: ActivatedRoute) { }

	ngOnInit() {
			var id = this.route.snapshot.paramMap.get('data');			
			this.ProductoService.getProductoDetalle(id).subscribe(data =>{
				this.detalle = data[0];
				this.ingredientes = data[0].ingredientes[0]
				
			})
	}
	agregarProducto(prod){
		var temp = []
		// console.log(prod);
		for(var i = 0; i < prod.ingredientes[0].length; i++){
			var ingre = prod.ingredientes[0][i].ingrediente;
			// console.log(ingre);
			
			for(var o = 0; o < ingre.length; o++){
				if(!ingre[o].checked){
					temp.push(ingre[o])
				}
				
			}
		}
		
		var sub_total = prod.precio * prod.cantidad
		var agcart = {
			"id": prod.id,
			"nombre" : prod.nombre,
			"precio" : prod.precio,
			"precio_bruto": prod.fix_precio_bruto * prod.cantidad,
			"cantidad" : prod.cantidad,
			"sub_total" : sub_total,
			"sin" : temp,
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
			timer : 1000,
			icon: "success"
		})
	}

}
