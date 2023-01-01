import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Configuracion } from 'src/app/modelo/configuracion.model';
import { ConfiguracionServicio } from 'src/app/servicios/configuracion.service';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit {
  
  isLoggedIn: boolean;
  loggedInUser: string;
  permitirRegistro: boolean | any;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private configuracionService: ConfiguracionServicio
  ) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth=>{
      if(auth){
        this.isLoggedIn = true;
        this.loggedInUser = ''+auth.email;
      }else{
        this.isLoggedIn = false;
      }
    });

    this.configuracionService.getConfiguracion().subscribe(
      (configuracion: Configuracion) =>{
        this.permitirRegistro = configuracion.permitirRegistro;
      }
    )
  }

  logout(){
    this.loginService.loguot();
    this.isLoggedIn = false;
    this.router.navigate(['/login'])
  }

}
