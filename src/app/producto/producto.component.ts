import { Component, Input, OnInit } from '@angular/core';
import { ProductoService } from './producto.service'
import { RevisarService } from '../revisar/revisar.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { Const } from '../const/url';
import { ModalventaComponent } from './../ventarapida/modalventa/modalventa.component'
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
	selector: 'app-producto',
	templateUrl: './producto.component.html',
	styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {


	constructor(private ProductoService: ProductoService, private router: Router, private modalService: BsModalService, private RevisarService: RevisarService,) { }
	productos
	pro
	cantidad
	count
	tipos
	cart
	message
	urlImage = Const.URL + '/imagen/'
	bsModalRef: BsModalRef;
	ngOnInit() {
		var url_string = window.location.href
		var url = new URL(url_string);
		var c = url.searchParams.get("id_orden");
		var error = url.searchParams.get("error");
		if (error != null && c != null) {

			swal({
				title: "Lo sentimos",
				text: "No se ha completado el pago de su orden. ¿Desea reintentarlo?",
				icon: "warning",
				dangerMode: true,
			})
				.then((willDelete) => {
					if (willDelete) {
						var payload = {
							"order": c,
							"url_return": Const.host + "/producto"
						}
						this.RevisarService.setPagoOnLine(payload).subscribe(response => {
							console.log(response);
							var redirect = Const.URL + "/webpay?token=" + response["token"]
							window.location.replace(redirect)

						})

					} else {
						window.location.replace(Const.host + '/producto')
					}
				});

		} else if (error != null && c == null) {



			swal({
				title: "Lo sentimos",
				text: "No se ha completado el pago de su orden.",
				icon: "error",

			}).then((value) => {
				window.location.replace(Const.host + '/producto')

			});

		} else if (c != null) {
			sessionStorage.removeItem('cart');
			var cart = [];
			sessionStorage.setItem("cart", JSON.stringify(cart))
			swal({
				title: "Muy Bien",
				text: "Se generó exitosamente la orden " + c,
				icon: "success"
			}).then((value) => {
				window.location.replace(Const.host + '/producto')
			});
		}
		var params = null
		if (!sessionStorage.getItem("cart")) {
			var cart = [];
			sessionStorage.setItem("cart", JSON.stringify(cart))

		}
		this.ProductoService.getTipoProductos().subscribe(data => {
			this.tipos = data['response'].data.info;

		});
		this.ProductoService.getProductos(params).subscribe(data => {
			this.productos = data['response'].data.info;
			this.count = data['response'].data.info.length
			sessionStorage.setItem("menu", JSON.stringify(this.productos))
		});
	}
	agregarProducto(prod) {

		const config: ModalOptions = {
			backdrop: 'static',
			keyboard: false,
			animated: true,
			ignoreBackdropClick: true,
			initialState: prod
		};
		this.bsModalRef = this.modalService.show(ModalventaComponent, config);
		// var sub_total = prod.precio * prod.cantidad
		// var agcart = {
		// 	"id": prod.id,
		// 	"nombre" : prod.nombre,
		// 	"precio" : prod.precio,
		// 	"precio_bruto": prod.fix_precio_bruto * prod.cantidad,
		// 	"cantidad" : prod.cantidad,
		// 	"sub_total" : sub_total,
		// 	"detalle" : {},
		// 	"descripcion": prod.descripcion,
		// 	"imagen": prod.imagen,
		// 	"iva" : prod.fix_iva * prod.cantidad,
		// 	"fix_iva" : prod.fix_iva,
		// 	"fix_bruto": prod.fix_precio_bruto
		// }

		// var cart = JSON.parse(sessionStorage.getItem("cart"));
		// cart.push(agcart)
		// sessionStorage.setItem("cart",JSON.stringify(cart))
		// swal({
		// 	title : "Producto Agregado",
		// 	timer : 1000,
		// 	icon: "success"
		// })


	}
	verDetalle(prod) {

		var detalle = prod.id

		this.router.navigate(['../detalle', { data: detalle }]);

	}
	filter(filtro = null, nombre = null) {

		var params = {}
		if (filtro) {
			params["id_tipo_producto"] = filtro
		}
		if (nombre) {
			params["nombre"] = nombre
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
		this.filter(null, this.message)
	}
}