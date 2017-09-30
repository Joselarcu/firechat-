import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Message } from '../interfaces/message.interface';

import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Injectable()
export class ChatService {

  chats: FirebaseListObservable<any[]>;
  user: any = null;

  constructor(private af: AngularFireDatabase, public afAuth: AngularFireAuth) {
    // this.chats = af.list('/chats');
    if(localStorage.getItem('user')){
      this.user = JSON.parse(localStorage.getItem('user'));
    }
    else{
      this.user = null;
    }
  }

  addMessage(text: string) {
    let message: Message = {
      name: this.user.displayName,
      message: text,
      uid: this.user.uid
    };

    return this.chats.push(message);

  }

  loadMessages() {
    this.chats = this.af.list('chats', {
      query: {
        limitToLast: 20,
        orderByKey: true
      }
    });
    return this.chats;
  }

  login(provider: string) {
    let prov: any;
    if(provider == 'google'){
      prov = new firebase.auth.GoogleAuthProvider();
    }
    else{
      prov = new firebase.auth.TwitterAuthProvider()
    }

    this.afAuth.auth.signInWithPopup(prov).then(response => {
      console.log(response); 
      console.log("response.user", response.user);
      this.user = response.user;
      localStorage.setItem('user',JSON.stringify(this.user));
    });
  }

  logout() {
    localStorage.removeItem('user');
    this.user = null;
    this.afAuth.auth.signOut();
  }

}
