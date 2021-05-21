import { Component, OnInit } from '@angular/core';
import { RevisarService } from './revisar.service';
import { RegistroService } from './../registro/registro.service'
import { Const } from './../const/url';
import swal from 'sweetalert';
import $ from 'jquery'

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
			"id_direccion": 1,
			"pago": {
				"monto": this.total,
				"id_tipo_pago": this.tipo_pago,
				"voucher": null,
				"comprobante": null,
				"vuelto": this.cambioE,
				"estado": 2
			},
			"detalle": cartInfo,

		}
		var orden = null
		this.RevisarService.setOrden(jsonOrder).subscribe(response => {
			if (response["estado"] == 1) {
				orden = response["orden"]
				
				if (this.tipo_pago == 3 || this.tipo_pago ==8 ) {
					var tipoP =1; 
					if (this.tipo_pago ==8){
						tipoP = 8;
					}
					var PayKu = {
						"email": this.registro["email"],
						"order": response["orden"],
						"subject": "Pago orden N° " + orden.toString(),
						"amount": this.total,
						"payment": tipoP,
						"urlreturn": Const.host + "/producto",
						//"urlreturn": "http://nrquena.ddns.net:5000" + "/producto",
						"urlnotify": Const.URL + "/pagoenlinea"
					}
					this.RevisarService.setPagoOnLine(PayKu).subscribe(response1 => {
						if (response1["id"]) {
							sessionStorage.removeItem('cart');
							var cart = [];
							sessionStorage.setItem("cart", JSON.stringify(cart))
							swal({
								title: "Muy Bien",
								text: "Se generó exitosamente la orden " + orden,
								icon: "success"
							}).then((value) => {
								window.location.replace(response1["url"])
							});

						}

					})
				} else {
					this.sendMail(jsonOrder,orden)
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
	getContext(jsoninfo) {
		var html = ''
		html += `<table width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f5f7fa">
		<tbody cellspacing="0" cellpadding="0" border="0">
			<tr>
				<td align="center" valign="top">
					<table cellspacing="0" cellpadding="0" border="0" style="max-width: 100%; padding: 3%; background:white;">
						<tbody cellspacing="0" cellpadding="0" border="0">
							<tr>
								<td align="center" style="text-align: center;">
									<!-- <img src="{{respuesta.dominio_env + '/api_static/images/logo/' + respuesta.logo_prestador + '?api_key=MTR30LJn0ZjQYFaEIaMRT585PSHZufhjU7KCIvEc'}}"
												alt="{{respuesta.nombre_prestador}}" style="width: 60%;"> -->
									<p style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;">
										Estimada (o) ${jsoninfo.nombre}.
									</p>
									<p style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;">
										Junto con agradecer su preferencia,
										le informamos que su orden <b>${jsoninfo.orden}</b> ha sido recepcionada
									</p>
	
	
								</td>
							</tr>
							<tr>
								<td style="border-bottom: 1px solid rgba(0,0,0,.1); padding: 0; text-transform: uppercase;">
									<h3>Datos de la orden</h3>
								</td>
							</tr>
							<tr>
								<td>
									<h4 style="margin-bottom: 10px; margin-top: 10px;text-transform: capitalize;">
										${jsoninfo.nombre} <br>
										${jsoninfo.telefono}<br>
										${jsoninfo.email}
									</h4>
								</td>
							</tr>
							<tr>
								<td style="border-bottom: 1px solid rgba(0,0,0,.1); padding: 0; text-transform: uppercase;">
									<h3>Productos </h3>
								</td>
							</tr>
							${this.htmlDetalle}
							<tr>
								<td>
									<br>
	
								</td>
	
							</tr>
							<tr>
								<td>
									<table style="width:100%">
										<tr>
											<td>
												<table width="100%" style="background: #fff9da; padding: 10px;"												cellspacing="0" cellpadding="0" border="0">
													<tbody>
														<tr>
															<td style="color:#d2a624;">Entrega :</td>
															<td style="color: #616161;"><b>${jsoninfo.tipo_entrega}</b></td>
														</tr>
														<tr>
															<td style="color:#d2a624;">Pago</td>
															<td style="color: #616161;"><b>${jsoninfo.tipo_pago}</b></td>
														</tr>
														<tr>
															<td style="color:#d2a624;">Direccion :</td>
															<td style="color: #616161;"><b>${jsoninfo.direccion}</b></td>
														</tr>
													</tbody>
												</table>
	
											</td>
										</tr>
									</table>
								</td>
							</tr>
	
							<tr>
								<td colspan="3"> <br><br> </td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		</tbody>
	</table>`

	return html
	}

	sendMail(json, orden){
		var Info = JSON.parse(sessionStorage.getItem('user'))
		var dir = ''

		
		for (var x = 0; x < Info.data[0].direcciones.length; x++){
			console.log(Info.data[0].direcciones[x].id, "here");
			if(Info.data[0].direcciones[x].id == json.id_direccion){
				dir = Info.data[0].direcciones[x].direccion_escrita +', ' + Info.data[0].direcciones[x].tipo_direccion +', ' + Info.data[0].direcciones[x].departamento.toString()
			}
		}
		for (var y = 0; y < json.detalle.length; y++){
			this.htmlDetalle +=`
			<tr>
				<td>
					<label style="margin-bottom: 10px; margin-top: 10px;"> 
						${json.detalle[y].cantidad} x ${json.detalle[y].nombre} : ${json.detalle[y].sub_total}
					</label>
				</td>
			</tr>`
		}
		var dataMail = {
			"nombre": Info.data[0].nombre +' '+ Info.data[0].apellido_paterno,
			"telefono" : '+56 ' + Info.data[0].telefono.toString(),
			"email" : Info.data[0].correo,
			"direccion": dir,
			"detalle" : json.detalle,
			"orden" : orden,
			"tipo_entrega" : $("#inputState1 option:selected").text(),
			"tipo_pago" : $("#inputState option:selected").text(),

		}
		var context = this.getContext(dataMail);
		var sendin = {
			"sender": {
				"name": "No-Reply",
				"email": "no-reply@rypsystems.cl"
			},
			"to": [
				{
					"email":  Info.data[0].correo,
					"name": Info.data[0].nombre +' '+ Info.data[0].apellido_paterno
				}
			],
			"textContent": this.getContext(dataMail),
			"subject": "Gracias por su compra, Orden N° " + orden.toString()
		}
		this.RegistroService.sendinBlue(sendin).subscribe(response=>{
			console.log("response");
			
		})


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
			er = true
		}
		// if(!this.registro['numerod']){
		// 	er = true
		// }
		if(!this.registro['apellido']){
			er = true
		}
		if(!this.registro['fono']){
			er = true
		}
		if(!this.registro['tipo']){
			er = true
		}
		// if(!this.registro['comuna']){
		// 	er = true
		// }
		if(!this.registro['direccion']){
			er = true
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
			"apellido" : this.registro['apellido'],
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
				this.id_direccion = data["data"][0]["direcciones"][0].id;
				this.calucarDelivery(this.id_direccion)	
				var sendin = {
					"sender": {
						"name": "No-Reply",
						"email": "no-reply@rypsystems.cl"
					},
					"to": [
						{
							"email": this.registro['email'],
							"name": this.registro['nombre'] +' ' +  this.registro['apellido']
						}
					],
					"textContent": this.getContext1(),
					"subject": "Bienvenido..!"
				}
				this.RegistroService.sendinBlue(sendin).subscribe( data =>{
					swal({

						title: "Registro Exitoso",
						text : "Los datos han sido almacenados con éxito",
						timer: 2000,
						icon: "success"
					})
					
				})


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
	getContext1(){
		var html =`<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Document</title>
		</head>
		<body>
			<div align="center">Ya puedes comenzar a comprar con nosotros</div>
			
		</body>
		</html>`

		return html
	}

}