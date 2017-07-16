import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { HttpHandler } from '../http/http';
import { ToastController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { AlertController } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import 'rxjs/add/operator/map';


@Injectable()
export class ContactProvider {

  constructor(
    public http:     HttpHandler,
    public toastCtrl: ToastController,
    private storage: Storage,
    private callNumber: CallNumber,
    public alertCtrl: AlertController,
    private contacts: Contacts,
  ) {
    // console.log('Hello ContactProvider Provider');
  }


  //
  //
  // GETTERS
  //
  //

  public getPupils(): Promise<any> {
    return this.storage.get('pupils').then(pupils => pupils = pupils.sort(this.orderByName));
  }

  public getCoaches(): Promise<any> {
    return this.storage.get('coaches').then(pupils => pupils = pupils.sort(this.orderByName));
  }

  public getContacts(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.getPupils().then(pupils => {
        this.getCoaches().then(coaches => {
          resolve(this.combineAndOrder(pupils, coaches));
        });
      });
    });

    return promise;
  }

  private combineAndOrder(contacts1: Array<any>, contacts2: Array<any>): Array<any> {
    return contacts1.concat(contacts2).filter((contact, index, contacts) => {
      return !contacts.slice(index+1).find(item => item.id === contact.id);
    });
  }

  private orderByName(a: any, b: any): number {
    return a.first_name < b.first_name ? -1 : a.first_name > b.first_name ? 1 : a.last_name < b.last_name ? -1 : 1;
  }

  //
  //
  // COMUNICAÇÃO COM O APARELHO
  //
  //

  public call(contact): Promise<any> {
    if (!contact.phone) {
      this.showContactDoesntHavePhoneToast();
      return Promise.resolve(false);
    }
    return this.callNumber.callNumber(contact.phone, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }

  public sendToPhoneContacts(contactInfo): Promise<any> {
    return new Promise((resolve, reject) => {
      this.showAskAddToContactList()
        .then(result => {
          if (result) {
            let contact: Contact = this.contacts.create();

            contact.name = new ContactName(null, contactInfo.last_name, contactInfo.first_name);
            contact.phoneNumbers = [new ContactField('mobile', contactInfo.phone)];

            contact.save()
              .then(
                () => this.showContactAddedToPhoneContactsList(),
                (error: any) => console.error('Error saving contact.', error)
              ).then(
                () => resolve(true)
              );
          } else {
            resolve(false);
          }
        });
    });
  }


  //
  //
  // ADICIONAR
  //
  //

  public addPupil(email): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.http.post('coaches/users', email)
        .subscribe(pupil => {
          // console.log('pupil', pupil);
          this.storage.get('pupils')
            .then(pupils => {
              pupils.push(pupil);
              this.storage.set('pupils', pupils)
                .then(() => {
                  this.showContactAddedToast();
                  resolve(true);
                });
            });
        }, error => {
          reject(error);
          if (error.statusText == 'Not Found') {
            this.showContactNotFoundToast();
          } else if (error.statusText == '') {

          }
        });
    });
    return promise;
  }

  //
  //
  // REMOVER
  //
  //

  public removePupil(id): Promise<any> {
    let promise =  new Promise((resolve, reject) => {
      this.http.delete('users/' + id + '/unfriend')
        .subscribe(result => {
          // console.log('result', result);
          if (result) {
            this.storage.get('pupils')
              .then(pupils => {
                pupils = pupils.filter(pupil => pupil.id != id);
                return this.storage.set('pupils', pupils)
              })
              .then(result => {
                this.showContactRemovedToast();
                resolve(true);
              });
          }
        }, error => {
          this.showContactRemoveErrorToast();
          reject(error);
        });
    });
    return promise;
  }


  //
  //
  // ALERTAS
  //
  //

  private showAskAddToContactList(): Promise<boolean> {
    let promise = new Promise((resolve, reject) => {
      this.showAlert(
        'Adicionar à agenda',
        'Tem certeza que deseja adicionar à sua agenda de contatos do celular?',
        data => {
          resolve(true);
        },
        data => {
          resolve(false);
        }
      );
    });

    return promise;
  }

  private showAlert(title: string, msg: string, okHander = null, cancelHandler = null) {
    let alert = this.alertCtrl.create();

    if (title) {
      alert.setTitle(title);
    }

    if (msg) {
      alert.setMessage(msg);
    }

    if (okHander) {
      if (cancelHandler) {
        alert.addButton({
          text: 'Cancelar',
          handler: cancelHandler
        });
      } else {
        alert.addButton('Cancelar');
      }

      alert.addButton({
        text: 'OK',
        handler: okHander
      });
    } else {
      alert.addButton('OK');
    }


    alert.present();
  }

  //
  //
  // TOASTS
  //
  //

  public showYouHaveNoPupilsToast() {
    this.showToast('Você ainda não possui alunos ou clientes associados!');
  }

  private showContactAddedToPhoneContactsList() {
    this.showToast('O contato foi adicionado com sucesso à lista de contatos!');
  }

  private showContactDoesntHavePhoneToast() {
    this.showToast('O contato não possui um telefone cadastrado!');
  }

  private showContactRemovedToast() {
    this.showToast('Contato removido com sucesso!');
  }

  private showContactAddedToast() {
    this.showToast('Contato adicionado com sucesso!');
  }

  private showContactNotFoundToast() {
    this.showToast('Não encontramos um contato com o e-mail digitado.');
  }

  private showContactRemoveErrorToast() {
    this.showToast('Não foi possível remover o contato selecionado.');
  }

  private showToast(msg: string) {
    setTimeout(() => {
      let toast = this.toastCtrl.create({
        message: msg,
        duration: 2500
      });
      toast.present();
    }, 100);
  }


}
