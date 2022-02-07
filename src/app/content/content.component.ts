import { Component, OnInit } from '@angular/core';
import { INote } from '../shared/notes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShareDataService } from '../shared/shareData.service';
import { IDataToEmit, NoteEvents } from '../shared/types';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  currentNote: INote;
  isEditMode = false;
  updatedNoteTitle = '';
  updatedNoteText = '';

  constructor(
    private route: ActivatedRoute,
    private shareDataService: ShareDataService,
    private router: Router
  ) {}

  private isIgnoredElementOnWindowClick(elementName) {
    return (
      elementName === 'save-note-btn' ||
      elementName === 'note-title-input' ||
      elementName === 'note-text-textarea' ||
      elementName === 'edit-note-btn'
    );
  }

  toggleEditMode(bool: boolean) {
    this.isEditMode = bool;
    if (bool === true) {
      this.updatedNoteTitle = this.currentNote.title;
      this.updatedNoteText = this.currentNote.text;
      const handleOuterClick = (evt) => {
        if (this.isIgnoredElementOnWindowClick(evt.target.name)) return;
        else {
          this.toggleEditMode(false);
          window.removeEventListener('click', handleOuterClick);
        }
      };
      window.addEventListener('click', handleOuterClick);
    } else {
      this.updatedNoteTitle = '';
      this.updatedNoteText = '';
    }
  }

  updateNote() {
    if (
      this.updatedNoteTitle === this.currentNote.title &&
      this.updatedNoteText === this.currentNote.text
    ) {
      this.toggleEditMode(false);
    } else {
      this.currentNote = {
        ...this.currentNote,
        text: this.updatedNoteText,
        title: this.updatedNoteTitle,
      };
      this.shareDataService.emitChange<NoteEvents>(
        { note: this.currentNote },
        NoteEvents.UPDATE
      );
      this.toggleEditMode(false);
    }
  }

  changeTitle(updatedTitle) {
    this.updatedNoteTitle = updatedTitle;
  }

  changeText(updatedText) {
    this.updatedNoteText = updatedText;
  }

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      if (history.state.note) {
        this.currentNote = history.state.note;
      }
    });

    this.route.queryParams.subscribe((params) => {
      if (params.isSraightNoteLink) {
        this.currentNote = history.state.note;
      }
    });

    this.shareDataService.changeEmitted$.subscribe(
      (data: IDataToEmit<NoteEvents>) => {
        if (
          data.event === NoteEvents.REMOVE &&
          this.currentNote?.id === data.change.removedNote.id
        ) {
          this.currentNote = undefined;
          this.router.navigate([`/`]);
        }
      }
    );
  }
}
