import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { log } from 'util';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  mensaje: string;
  elemento: any;
  constructor( public chatService: ChatService) {
    this.chatService.cargar_mensajes().subscribe(() => setTimeout(() => this.elemento.scrollTop = this.elemento.scrollHeight , 20) );
  }

  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
  }
  enviar_mensaje() {
    console.log('Mensaje enviado');
    if ( this.mensaje.length === 0 ) {
      return;
    }
    this.chatService.agregar_mensaje( this.mensaje ).
      then(() => { this.mensaje = ''; console.log('Mensaje enviado'); }).
    catch( (err) => console.error('Error al enviar', err ));
  }

}
