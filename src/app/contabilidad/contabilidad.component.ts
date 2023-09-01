import { Component, OnInit } from '@angular/core';
import { MovimientoService } from './movimiento.service';
import swal from 'sweetalert'
@Component({
  selector: 'app-contabilidad',
  templateUrl: './contabilidad.component.html',
  styleUrls: ['./contabilidad.component.css']
})
export class ContabilidadComponent implements OnInit {
  form = [];
  fecha;
  monto;
  concepto;
  centro_costo;
  tipo_movimiento
  disabled = false;
  tipo_egreso = 1;
  fecha_inicio = '2023-08-07';
  cisterna = []
  mes 
  anio
  lunes
  san_miguel = []
  san_ignacio = []
  totalLaCisterna: number;
  totalSanMiguel: number;
  totalSanIgnacio: number;
  groupedData
  tamanio
  tventas 
  constructor(private MovimientoService: MovimientoService,) { }
  ngOnInit() {
    var month 
    var year
    this.MovimientoService.getMesAnio().subscribe(resp =>{
      this.mes = resp["month"]
      this.anio = resp["year"]

      
      this.MovimientoService.getLunes(this.anio, this.mes).subscribe(lunes =>{
        this.lunes = lunes["dates"]
        
      })
    })
    this.consultar()
  }
  actualizafecha(){
    this.MovimientoService.getLunes(this.anio, this.mes).subscribe(lunes =>{
      this.lunes = lunes["dates"]
      this.fecha_inicio= lunes["dates"][0]
      this.consultar()
    })
  }
  consultar(){
    this.cisterna = []
    this.san_miguel = []
    this.san_ignacio = []
    var self = this
    if (this.fecha_inicio != null){

      this.MovimientoService.getMovimientos(this.fecha_inicio).subscribe(response =>{
        if(response["response"]["la_cisterna"].length > 0){

          self.cisterna = response["response"]["la_cisterna"]
        }
        if(response["response"]["san_miguel"].length > 0){
 
          self.san_miguel = response["response"]["san_miguel"]
        }
        if(response["response"]["san_ignacio"].length > 0){
        
          self.san_ignacio = response["response"]["san_ignacio"]
        }
        this.groupedData = response["response"]["ventas"]
        this.tamanio = this.groupedData.length
        this.totalLaCisterna = response["response"]["total_cisterna"]
        this.totalSanMiguel = response["response"]["total_san_miguel"]
        this.totalSanIgnacio = response["response"]["total_san_igancio"]
        this.tventas = response["response"]["total_ventas"]

        
        
      })
      
    }

  }
  registrar(){
    this.disabled = true
    if(!this.fecha || !this.monto || !this.concepto || !this.centro_costo || !this.tipo_movimiento ){
      var msj = 'Todos los campos son obligatorios'
 			swal({

				title: "Campos Obligatorios",
				text : msj,
				timer: 2000,
				icon: "error"
			})
      this.disabled = false
			return;
    }
    
    var json = {
      "fecha": this.fecha,
      "monto": this.monto,
      "id_centro_costo": this.centro_costo,
      "id_tipo_movimiento": this.tipo_movimiento,
      "concepto": this.concepto
    }
    if(this.tipo_movimiento == 2){

      if(this.tipo_egreso != null){
        json["tipo_egreso"] = this.tipo_egreso
      }else{
        alert("AQUI")
        swal({

          title: "Campos Obligatorios",
          text : msj,
          timer: 2000,
          icon: "error"
        })
        this.disabled = false
        return;

      }
    }

    this.MovimientoService.setRegistro(json).subscribe(data => {
      if(data["estado"] = 1){ 
        this.fecha = ''
        this.monto = ''
        this.centro_costo = ''
        this.tipo_movimiento= ''
        this.concepto= ''
        this.tipo_egreso= 1
        swal({

          title: "Registro Exitoso",
          text : "Los datos han sido almacenados con éxito",
          timer: 2000,
          icon: "success"
        })
        this.disabled = false
        this.consultar()
      }else{
        swal({

          title: "Error al Registrar",
          text : "Ha ocurrido un error inesperado",
          timer: 2000,
          icon: "error"
        })
        this.disabled = false
        return;
      }
      

    })
    
  }
  
}
