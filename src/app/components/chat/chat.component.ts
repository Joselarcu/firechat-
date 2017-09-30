import { Component, OnInit } from '@angular/core';
import { ChatService } from 'app/services/chat.service';
import { Message } from 'app/interfaces/message.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {

  message: string = "";
  messages: Message[];
  element: any;

  constructor(public cs: ChatService) {
    this.cs.loadMessages().subscribe((response) => {
      console.log("Messages loaded...");
      this.messages = response;
      setTimeout(() => this.element.scrollTop = this.element.scrollHeight, 100);

    });

  }

  send() {
    if (this.message.length == 0) {
      return;
    }
    this.cs.addMessage(this.message).then(() => console.log("Done!"))
      .catch((error) => console.log("error"));
    this.message = "";
  }

  ngOnInit() {
    this.element = document.getElementById("app-messages");
  }


}
