import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';


@IonicPage({name:'chat'})
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  @ViewChild(Content) content: Content;

  user: any;
  contact: any;
  offset: number = 0;
  message: string;
  messages: Array<any>;
  today: string;
  checkNewMessages: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _chat: ChatProvider
  ) {
    this.today = new Date().toDateString();
    this.user     = this.navParams.get('user');
    this.contact  = this.navParams.get('contact');
  }

  ionViewDidLoad() {
    this.getMessages();
  }

  ionViewWillEnter() {
    this.checkNewMessages = setInterval(() => this.getMessages(), 5000);
  }

  ionViewWillLeave() {
    clearInterval(this.checkNewMessages);
  }

  private send() {
    let messageObject = {
      from:       this.user.id,
      to:         this.contact.id,
      body:       this.message,
      seen:       'loading',
      created_at: (new Date).toString(),
    };

    this.messages.push(messageObject);
    this._chat.post(this.contact.id, this.message).subscribe(message => {
      this.messages = this.messages.filter(message => !!message.id);
      this.messages.push(message);
      this.scrollToBottom();
    });

    this.message = '';
  }

  private scrollToBottom(time:number = 100) {
    console.log('scrool bottom', time);
    setTimeout(() => this.content.scrollToBottom(), time);
  }

  private scrollToTop(time:number = 100) {
    setTimeout(() => this.content.scrollToTop(), time);
  }

  private getOlderMessages(): Promise<any> {
    this.offset += 10;
    return this.getMessages(this.offset);
  }

  private getMessages(offset: number = null): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this._chat.getMessagesFrom(this.contact.id, offset).subscribe((messages: Array<any>)=> {
        let newMessages = false;
        this.messages = this.messages || [];

        resolve(true);

        messages.forEach(message => {
          let index = this.messages.findIndex(msg => msg.id === message.id);
          if (index == -1) {
            this.messages.push(message);
            newMessages = true;
          } else {
            this.messages.splice(index, 1, message);
          }
        });

        this.messages.sort((a, b) => a.created_at < b.created_at ? -1 : 1);

        if (newMessages) {
          offset > 0 ? this.scrollToTop() : this.scrollToBottom();
        }

      });
    });

    return promise;
  }

  private doRefresh(refresher) {
    this.getOlderMessages()
      .then(() => setTimeout(() => refresher.complete(), 100));
  }


}
