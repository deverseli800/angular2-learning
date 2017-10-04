import { Injectable } from '@angular/core';

@Injectable()
export class MailService {
  messages = [
    { id: 0, text: `You're now friends with John`},
    { id: 1, text: `John liked your tweet`},
    { id: 2, text: `You'll never know what John did`},
  ];
  update(id, text) {
    this.messages.map(m => m.id === id ? {id, text} : m);
  }
  constructor() { }

}
