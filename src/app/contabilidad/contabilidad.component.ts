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
  constructor(private MovimientoService: MovimientoService,) { }

  ngOnInit() {
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
    this.MovimientoService.setRegistro(json).subscribe(data => {
      if(data["estado"] = 1){ 
        this.fecha = ''
        this.monto = ''
        this.centro_costo = ''
        this.tipo_movimiento= ''
        this.concepto= ''
        swal({

          title: "Registro Exitoso",
          text : "Los datos han sido almacenados con éxito",
          timer: 2000,
          icon: "success"
        })
        this.disabled = false
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
