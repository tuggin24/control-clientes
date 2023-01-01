import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { map } from "rxjs";

@Injectable()
export class LoginService{
    constructor(private authService: AngularFireAuth){}
    
    //Hacemos el login
    login(email:string, password:string){
        return new Promise((resolve, reject) =>{
            this.authService.signInWithEmailAndPassword(email,password).then(
                datos => resolve(datos),
                error => reject(error)
            )
        })
    }

    //Miramos quien esta logeado
    getAuth(){
        return this.authService.authState.pipe(
            map( auth => auth)
        );
    }
    
    //Deslogeamos
    loguot(){
        this.authService.signOut();
    }

    //Registramos usuario
    registrarse(email:string, password: string){
        return new Promise((resolve, reject) =>{
            this.authService.createUserWithEmailAndPassword(email,password)
            .then(datos => resolve(datos),
            error => reject(error))
        });
    }
}