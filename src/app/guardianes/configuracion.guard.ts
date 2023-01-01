import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { ConfiguracionServicio } from "../servicios/configuracion.service";

@Injectable()
export class ConfiguracionGuard implements CanActivate{
    constructor(
        private router: Router,
        private configuracionService: ConfiguracionServicio
    ){}

    canActivate(): Observable<boolean>{
        return this.configuracionService.getConfiguracion().pipe(
            map(configuracion =>{
                if(configuracion.permitirRegistro){
                    return true;
                }else{
                    this.router.navigate(['/login']);
                    return false;
                }
            })
            )
    }
}