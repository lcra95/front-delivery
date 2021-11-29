import { Component, OnInit } from '@angular/core';
import { LinkpagoService } from './linkpago.service';
@Component({
  selector: 'app-linkpago',
  templateUrl: './linkpago.component.html',
  styleUrls: ['./linkpago.component.css']
})
export class LinkpagoComponent implements OnInit {
  monto = ""
  link = ""
  constructor(private LinkpagoService: LinkpagoService) { }

  ngOnInit() {
  }
  limpiar(){
    this.monto =""
    this.link = ""
  }
  generar(){
    var params = {
      "monto": this.monto
    }
    this.LinkpagoService.generar(params).subscribe(data=>{
      console.log(data)
      this.link ="http://rypsystems.cl:5000/pago?id="+data
    })
  }
  copiarAlPortapapeles(id_link) {

    // Crea un campo de texto "oculto"
    var aux = document.createElement("input");
  
    // Asigna el contenido del elemento especificado al valor del campo
    aux.setAttribute("value", document.getElementById(id_link).innerHTML);
  
    // Añade el campo a la página
    document.body.appendChild(aux);
  
    // Selecciona el contenido del campo
    aux.select();
  
    // Copia el texto seleccionado
    document.execCommand("copy");
  
    // Elimina el campo de la página
    document.body.removeChild(aux);
  
  }
}
