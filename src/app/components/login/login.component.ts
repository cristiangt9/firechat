import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private chatService: ChatService) { }

  ngOnInit() {
  }
  ingresar( ingreso: string ) {
    console.log(ingreso);
    if( ingreso === 'google'){
      this.chatService.login_google();
    }
  }
  salir(ingreso: string) {
    console.log(ingreso);
    if (ingreso === 'google') {
      this.chatService.logout_google();
    }
  }
}
