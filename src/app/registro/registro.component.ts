import { Component, OnInit } from '@angular/core';
import { RegistroService } from './registro.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import swal from 'sweetalert'
@Component({
	selector: 'app-registro',
	templateUrl: './registro.component.html',
	styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

	constructor(private RegistroService: RegistroService, private toastr: ToastrService, private router: Router) { }
	comunas
	tipos
	registro = []
	fadreess = '';
	place_id = '';
	options = {
		componentRestrictions: {
			country: ['CL']
		}
	}
	ngOnInit() {
		this.RegistroService.getComunas().subscribe(data=>{
			this.comunas = data['response'].data.info
		})
		this.RegistroService.getTipoDireccion().subscribe(data=>{
			this.tipos = data['response'].data.info
		})

	}
	registrar(){
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
		if(!this.registro['password1']){
			er = true
		}
		if(!this.registro['password2']){
			er = true
		}
		if(this.registro['password2'] != this.registro['password1']){
			er = true;
			msj = "Los passwords no coinciden"
		}
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
			"password" : this.registro['password1'],
			"numerod" : this.registro['numerod'],
			"departamento" : dept,
			"registro": 1,
			"id_place": this.place_id
		}

		this.RegistroService.setRegistro(jsPersona).subscribe(data => {
			if (data["estado"] == 1) {
				
				sessionStorage.setItem("user", JSON.stringify(data))
				this.router.navigate(['/cart'])
				
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
					"textContent": this.getContext(),
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
	getContext(){
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
	public handleAddressChange(address: any) {
		this.fadreess = address
		this.place_id = this.fadreess["place_id"];
		console.log(this.fadreess["place_id"]);
		this.registro['direccion'] =  this.fadreess["formatted_address"]
		
	}
}
