import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { INote } from '../shared/notes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() onCreateNoteBtnClick = new EventEmitter<INote>();
  @Output() onLogoClick = new EventEmitter();

  isPopupOpened = false;
  newNoteTitle = '';
  newNoteText = '';

  constructor() {}

  handleLogoClick() {
    this.onLogoClick.emit();
  }

  setIsPopupOpened(bool: boolean) {
    this.isPopupOpened = bool;
  }

  handleSubmit() {
    this.onCreateNoteBtnClick.emit({
      id: +new Date(),
      title: this.newNoteTitle,
      text: this.newNoteText,
    });
    this.setIsPopupOpened(false);
    this.newNoteText = '';
    this.newNoteTitle = '';
  }

  ngOnInit(): void {}
}
