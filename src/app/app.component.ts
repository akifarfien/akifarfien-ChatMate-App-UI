import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { ChatService } from "src/services/chat.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "shareit-ui";
  chatContent = "";
  chatId: string;
  chatData = [];
  connectionId: string;
  name: string;
  exception = false;

  constructor(private chatservice: ChatService) {}

  ngOnInit() {
    this.updateChat();
  }

  updateChat() {
    setInterval(() => {
      if (this.chatId) {
        this.chatservice.getChatData(this.chatId).subscribe((res: any) => {
          this.chatData = [...res.contentList];
        });
      }
    }, 1000);
  }

  sendMessage() {
    this.exception = false;

    if (this.chatId) {
      const payload = {
        uniqueCodeUrl: this.chatId,
        lastcontent: this.chatContent,
        name: this.name,
      };

      this.chatservice.putChatData(payload).subscribe((res: any) => {
        this.chatData = [...res.contentList];
      });
      this.chatContent = "";
    } else {
      const payload = {
        lastcontent: this.chatContent,
        name: this.name,
      };
      this.chatservice.postChatData(payload).subscribe((res: any) => {
        this.chatId = res.uniqueCodeUrl;
        this.chatData = [...res.contentList];
      });
      this.chatContent = "";
    }
  }

  startChat(id) {
    this.chatId = id;
    if (this.chatId) {
      this.chatservice.getChatData(this.chatId).subscribe(
        (res: any) => {
          this.chatId = res.uniqueCodeUrl;
          this.chatData = [...res.contentList];
        },
        (error) => {
          this.exception = true;
          this.chatId = null;

        }
      );
    }
  }

  setName(name) {
    this.exception = false;
    this.name = name;
  }

  endChat() {
    this.exception = false;
    this.chatId = null;
    this.chatData = [];
    this.chatContent = "";
  }
}
