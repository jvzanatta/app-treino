import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'list-with-picture',
  templateUrl: 'list-with-picture.html'
})
export class ListWithPicture {

  @Input()  itemClass: 'string';
  @Input()  listClass: 'string';
  @Input()  contactList: Array<any>;
  @Output() itemTapped = new EventEmitter<any>();


  constructor() {
    // console.log('ListWithPictureComponent Component');
  }

  private onItemTapped(item) {
    this.itemTapped.emit(item);
  }

}
