import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { INote } from '../shared/notes.service';
import { Router } from '@angular/router';
import { ShareDataService } from '../shared/shareData.service';
import { NoteEvents } from '../shared/types';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnChanges {
  @Input() notes: INote[];
  @Input() currentNote: INote;
  @Output() onNoteClick = new EventEmitter<INote>();
  @Output() onRemoveBtnClick = new EventEmitter<INote>();

  constructor(
    private router: Router,
    private shareDataService: ShareDataService
  ) {}

  private goToNotePage(note: INote) {
    this.router.navigate([`/note`, note.id], { state: { note } });
  }

  handleNoteClick(note: INote) {
    this.onNoteClick.emit(note);
    this.goToNotePage(note);
  }

  handleRemoveBtnClick(evt: Event, removedNote: INote) {
    evt.stopPropagation();
    this.onRemoveBtnClick.emit(removedNote);
    this.shareDataService.emitChange({ removedNote }, NoteEvents.REMOVE);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.currentNote &&
      changes.currentNote !== undefined &&
      !changes.currentNote.previousValue
    ) {
      this.router.navigate([`/note`, this.currentNote.id], {
        state: { note: this.currentNote },
        queryParams: { isSraightNoteLink: true },
      });
    }
  }
}
