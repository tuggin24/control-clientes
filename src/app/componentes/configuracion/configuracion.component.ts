import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Configuracion } from 'src/app/modelo/configuracion.model';
import { ConfiguracionServicio } from 'src/app/servicios/configuracion.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {
  
  permitirRegistro:boolean | any = false;
  constructor(
    private router: Router,
    private configuracionService: ConfiguracionServicio
  ) { }

  ngOnInit(): void {
    this.configuracionService.getConfiguracion().subscribe(
      (configuracion: Configuracion) =>{
        this.permitirRegistro = configuracion.permitirRegistro;
      }
    )
  }
  
  guardar(){
    let configuracion = {permitirRegistro:this.permitirRegistro};
    this.configuracionService.modificarConfiguracion(configuracion);
    this.router.navigate(['/']);
  }
}
