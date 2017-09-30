import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(public chatService: ChatService) { }

  ngOnInit() {
  }

  login(provider: string){
    this.chatService.login(provider);
  }

}
