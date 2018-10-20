import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../components/interface/mensaje.interface';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[];
  public usuario: any = {nombre: ''};
  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe( data => {
      console.log('Estado del usuario', data)
      if(!data){
        return;
      }
      this.usuario.nombre = data.displayName;
      this.usuario.uid = data.uid;
    });
  }
  cargar_mensajes() {
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc').limit(5));
    return this.itemsCollection.valueChanges().pipe( map( (mensajes: Mensaje[]) => {
      this.chats = [];
      for (let mensaje of mensajes){
        this.chats.unshift( mensaje );
      }
      console.log('chats:');
      console.log(this.chats);
    }
    ));
  }
  agregar_mensaje( texto: string ) {
    const mensaje: Mensaje = {
      nombre: 'Demo',
      mensaje: texto,
      fecha: new Date().getTime()
    };

    return this.itemsCollection.add(mensaje);
  }
  login_google() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout_google() {
    this.afAuth.auth.signOut();
    this.usuario = {nombre: ''};
  }
}
