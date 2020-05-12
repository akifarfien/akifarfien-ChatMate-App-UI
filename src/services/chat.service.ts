import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  postChatData(data){
    const dataValue =  this.http.post('https://shareit-restapi.herokuapp.com/api/v1/copypasteapi',data);
    return dataValue;
  }

  putChatData(data){
    const dataValue =  this.http.put('https://shareit-restapi.herokuapp.com/api/v1/copypasteapi',data);
    return dataValue;
  }

  getChatData(data){
    const dataValue =  this.http.get(`https://shareit-restapi.herokuapp.com/api/v1/copypasteapi/${data}`);
    return dataValue;
  }
 }
