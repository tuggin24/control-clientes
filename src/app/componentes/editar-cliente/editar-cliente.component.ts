import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  
  id: string;
  cliente: Cliente = {
    nombre:'',
    apellido:'',
    email:'',
    saldo: 0
  };

  constructor(
    private clienteServices:ClienteService,
    private falshMessages: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clienteServices.getcliente(this.id).subscribe(cliente =>{
      this.cliente = cliente;
    })
  }

  guardar(clienteForm:NgForm){
    if(!clienteForm.valid){
      this.falshMessages.show('Por favor llenar el formulario correctamente.',{
        cssClass: 'alert-danger',
        timeout: 4000
      });
    }else{
      clienteForm.value.id = this.id;
      //Modificar cliente
      this.clienteServices.modificarCliente(clienteForm.value);
      this.router.navigate(['/']);
    }
  }

  eliminar(){
    if(confirm('¿Seguro que desea eliminar el cliente?')){
      this.clienteServices.eliminarCliente(this.cliente);
      this.router.navigate(['/']);
    }
  }

}
