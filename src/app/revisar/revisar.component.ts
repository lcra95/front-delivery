import { Component, OnInit } from '@angular/core';
import { RevisarService } from './revisar.service';
import { RegistroService } from './../registro/registro.service'
import { Const } from './../const/url';
import swal from 'sweetalert';
import $ from 'jquery'
import { monthsShort } from 'moment';

@Component({
	selector: 'app-revisar',
	templateUrl: './revisar.component.html',
	styleUrls: ['./revisar.component.css']
})
export class RevisarComponent implements OnInit {
	registro = []
	entregas
	pagos
	tipo_entrega
	direcciones = []
	delivery = false;
	carros
	Stotal = 0
	items
	iva = 0
	total = 0
	kilometros = ""
	mDelivery = 0
	cuentas
	transfer = false
	tipo_pago
	dirselect = null
	sinDtotal
	newDir = false
	tipos
	comunas
	tmonto
	vuelto
	id_persona
	id_direccion
	fin = false
	constructor(private RevisarService: RevisarService, private RegistroService: RegistroService) { }
	fadreess = '';
	place_id = '';
	options = {
		componentRestrictions: {
			country: ['CL']
		}
	}
	efective = false;
	cambioE = 0;
	htmlDetalle = ''
	confirmado = false
	enable = false
	urlImage = Const.URL+'/imagen/'
	enviaMail = true
	ngOnInit() {

		this.carros = JSON.parse(sessionStorage.getItem('cart'));
		this.items = this.carros.length;
		if (this.carros.length > 0) {
			for (var i = 0; i < this.carros.length; i++) {

				this.Stotal = this.Stotal + this.carros[i].precio_bruto
				this.iva = this.iva + this.carros[i].iva;
				this.total = this.total + this.carros[i].sub_total
			}
		}

		this.tmonto = this.total

		this.RevisarService.getTipoEntrega().subscribe(data => {
			this.entregas = data['response'].data.info
		})
		this.RevisarService.getTipoPago().subscribe(data => {
			this.pagos = data['response'].data.info
		})
		this.RegistroService.getTipoDireccion().subscribe(data=>{
			this.tipos = data['response'].data.info
		})
	}
	setTipoEntrega() {

		if (this.tipo_entrega == 3) {
			this.delivery = true;
			this.total = this.total
			// this.direcciones = JSON.parse(sessionStorage.getItem('user')).data[0].direcciones
			if (this.tipo_pago == 1) {
				this.efective = true;
			}
			this.tmonto = this.total + this.mDelivery
		} else {
			this.dirselect = null
			if (this.delivery) {
				this.total = this.total + this.mDelivery - this.mDelivery
			}
			this.mDelivery = 0
			this.delivery = false;
			this.tmonto = this.total
		}

	}
	setTipoPago() {
		if (this.tipo_pago == 2) {
			this.transfer = true;
			this.RevisarService.getCuenta().subscribe(data => {
				this.cuentas = data['response'].data.info
			})
			this.efective = false;
		} else if (this.tipo_pago == 1) {
			if (this.tipo_entrega == 3) {
				this.efective = true;
			}
			this.transfer = false;
		}
		else {
			this.transfer = false;
			this.efective = false;
		}
	}
	finalizar() {
		var userInfo = JSON.parse(sessionStorage.getItem('user'));
		var cartInfo = JSON.parse(sessionStorage.getItem('cart'));
		var er = false
		var msj = "Todos los campos son obligatorios"
		if (!this.tipo_entrega) {
			er = true
		}
		if (!this.tipo_pago) {
			er = true
		}
		if (this.tipo_entrega == 3 && !this.dirselect) {
			er = true
			msj = "Debe elegir una dirección para delivery"
		}
		if (cartInfo.length == 0) {
			er = true
			msj = "Debe agregar al menos un producto a su carro de compras"
		}
		if (this.tipo_entrega == 3 && this.tipo_pago == 1 && !this.vuelto) {
			er = true
			msj = "Por favor indique con cuanto pagará"
		}
		if (this.tmonto > this.vuelto) {
			er = true
			msj = "Verifique el monto que pagará"
		} else {
			this.cambioE = this.vuelto - this.tmonto
		}
		// console.log(this.tipo_entrega ,this.tipo_pago ,this.vuelto);

		// return
		if (er) {
			swal({

				title: "Campos Obligatorios",
				text: msj,
				timer: 1000,
				icon: "error"
			})
			return;
		}

		var jsonOrder = {
			"id_creador": 1,
			"id_persona": this.id_persona,
			"id_tipo_entrega": this.tipo_entrega,
			"id_sucursal": 1,
			"id_direccion": this.dirselect,
			"pago": {
				"monto": this.total + this.mDelivery,
				"id_tipo_pago": this.tipo_pago,
				"voucher": null,
				"comprobante": null,
				"vuelto": this.cambioE,
				"estado": 2
			},
			"detalle": cartInfo,
			"delivery": this.mDelivery,
			"kilometros": this.kilometros

		}
		var orden = null
		this.RevisarService.setOrden(jsonOrder).subscribe(response => {
			if (response["estado"] == 1) {
				orden = response["orden"]
				
				if (this.tipo_pago == 3 || this.tipo_pago == 8 ) {

					var payload = {
						"order" : orden,
						"url_return" : Const.host + "/producto"
					}
					this.RevisarService.setPagoOnLine(payload).subscribe(response =>{
						console.log(response);
						var redirect =  Const.URL + "/webpay?token=" + response["token"]
						window.location.replace(redirect)
						
					})
							
				} else {
					if(this.enviaMail){
						this.RegistroService.sendinBlue(orden).subscribe(response=>{
							console.log("response");	
						})
					}
					sessionStorage.removeItem('cart');
					var cart = [];
					sessionStorage.setItem("cart", JSON.stringify(cart))
					swal({
						title: "Muy Bien",
						text: "Se generó exitosamente la orden " + orden,
						icon: "success"
					}).then((value) => {
						window.location.replace(Const.host + '/producto')
					});
					// window.location.replace(Const.host +'/producto')
				}
			}

		})

	}
	newDire() {
		this.newDir = true;
		this.RegistroService.getComunas().subscribe(data => {
			this.comunas = data['response'].data.info
		})
		this.RegistroService.getTipoDireccion().subscribe(data => {
			this.tipos = data['response'].data.info
		})
	}
	guardarDir() {
		var dept = null;
		var er = false;
		var msj = "Debe llenar todos los campos son obligatorios"

		if (!this.registro['tipo']) {
			er = true
		}
		// if (!this.registro['comuna']) {
		// 	er = true
		// }
		if (!this.registro['direccion']) {
			er = true
		}
		// if (!this.registro['numerod']) {
		// 	er = true
		// }
		if (er) {
			swal({

				title: "Campos Obligatorios",
				text: msj,
				timer: 1000,
				icon: "error"
			})
			return;
		}
		if (this.registro['departamento']) {
			dept = this.registro['departamento']
		}
		var userInfo = JSON.parse(sessionStorage.getItem('user'));
		var jsonDir = {
			"id_comuna": this.registro['comuna'],
			"direccion_escrita": this.registro['direccion'],
			"numero": this.registro['numerod'],
			"id_tipo_direccion": this.registro['tipo'],
			"departamento": dept,
			"id_persona": userInfo.data[0].id,
			"id_place": this.place_id
		}
		var desComuna = ''
		var tipoDesc = ''
		this.RevisarService.setNewDireccion(jsonDir).subscribe(response => {
			if (response["estado"] == 1) {
				this.calucarDelivery(response["id_direccion"])
				swal({

					title: "OK!",
					text: response["msj"],
					timer: 1000,
					icon: "success"
				})
				for (var x = 0; x < this.comunas.length; x++) {
					if (this.comunas[x].id = this.registro['comuna']) {
						desComuna = this.comunas[x].nombre
					}
				}
				for (var y = 0; y < this.tipos.length; y++) {
					if (this.tipos[y].id = this.registro['tipo']) {
						tipoDesc = this.tipos[y].nombre
					}
				}
				this.RevisarService.personafull(userInfo.data[0].id).subscribe(persona => {
					userInfo.data = persona;
					sessionStorage.setItem("user", JSON.stringify(userInfo))
					this.newDir = false;
					this.setTipoEntrega()
					this.dirselect = response["id_direccion"]
				})


			} else {
				swal({

					title: "Error al registrar",
					text: response["msj"],
					timer: 1000,
					icon: "error"
				})
			}

		})
	}
	calucarDelivery(direccion =null) {
		if (direccion){
			this.dirselect = direccion
		}
		this.RevisarService.getplaces(this.dirselect).subscribe(data => {
			if (data["estado"] == 1) {

				this.mDelivery = data["monto"];
				this.kilometros = data["distancia"]
				this.setTipoEntrega()
			} else {
				swal({

					title: "Distancia no cubierta",
					text: "No es posible realizar un despacho a " + data["distancia"],
					icon: "error"
				})
				this.dirselect = null
			}

		})
	}
	public handleAddressChange(address: any) {
		this.fadreess = address
		this.place_id = this.fadreess["place_id"];
		this.registro['direccion'] = this.fadreess["formatted_address"]

	}

	confirmarDatos(){
		var dept = null;
		var er = false;
		var msj = "Todos los campos son obligatorios"
		// if(!this.registro['identificacion']){
		// 	er = true
		// }
		if(!this.registro['nombre']){
			er = true
		}
		if(!this.registro['email']){
			this.registro['email'] = "sin@correo.cl"
			this.enviaMail = false
			// er = true
		}
		// if(!this.registro['numerod']){
		// 	er = true
		// }
		// if(!this.registro['apellido']){
		// 	er = true
		// }
		if(!this.registro['fono']){
			er = true
		}

		// if(!this.registro['comuna']){
		// 	er = true
		// }
		if(this.tipo_entrega == 3){
			if(!this.registro['direccion']){
				er = true
			}
			if(!this.registro['tipo']){
				er = true
			}
		}
		// if(!this.registro['password1']){
		// 	er = true
		// }
		// if(!this.registro['password2']){
		// 	er = true
		// }
		// if(this.registro['password2'] != this.registro['password1']){
		// 	er = true;
		// 	msj = "Los passwords no coinciden"
		// }
		if(er){ 
			swal({

				title: "Campos Obligatorios",
				text : msj,
				timer: 2000,
				icon: "error"
			})
			return;
		}
		if(this.registro['departamento']){
			dept = this.registro['departamento']
		}
		var jsPersona = {
			"identificacion": this.registro['identificacion'],
			//"identificacion": null,
			"nombre" : this.registro['nombre'],
			"apellido" : "",
			"id_comuna" : this.registro['comuna'],
			"id_tipo_direccion" : this.registro['tipo'],
			"numero" : this.registro['fono'],
			"email" : this.registro['email'],
			"direccion" : this.registro['direccion'],
			"password" : "12345",
			"numerod" : this.registro['numerod'],
			"departamento" : dept,
			"registro": 1,
			"id_place": this.place_id
		}

		this.RegistroService.setRegistro(jsPersona).subscribe(data => {
			if (data["estado"] == 1) {
				sessionStorage.setItem("user", JSON.stringify(data))
				this.id_persona = data["data"][0].id
				if (data["data"][0]["direcciones"].length > 0){
					this.id_direccion = data["data"][0]["direcciones"][0].id;
					this.calucarDelivery(this.id_direccion)	
				}
				this.fin = true

			} else if (data["estado"] == 0) {
			
				swal({

					title: "Error",
					text : "Ha ocurrido un error inesperado",
					timer: 2000,
					icon: "error"
				})
				return
			}

		})
	}

}