import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { INote, NotesService } from './shared/notes.service';
import { ShareDataService } from './shared/shareData.service';
import { IDataToEmit, NoteEvents } from './shared/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  notes: INote[];
  currentNote: INote;

  constructor(
    private notesService: NotesService,
    private router: Router,
    private shareDateService: ShareDataService
  ) {}

  private create(note: INote) {
    this.notesService
      .create(note)
      .subscribe((note: INote) => this.notes.push(note));
  }

  private remove(noteId: INote['id']) {
    this.notesService.delete(noteId).subscribe(
      (noteResponse: INote) => {
        this.notes = this.notes.filter((note) => note.id !== noteResponse.id);
      },
      (err) => console.error('Error when remove ', err.message)
    );
  }

  private update(note: INote) {
    this.notesService.update(note).subscribe(
      (notes: INote[]) => {
        this.notes = notes;
      },
      (err) => console.error('Error when update ', err.message)
    );
  }

  setCurrentNote(note: INote) {
    this.currentNote = note;
  }

  resetCurrentNote() {
    this.currentNote = undefined;
  }

  createNote(note: INote) {
    this.create(note);
  }

  removeNote(note: INote) {
    this.remove(note.id);
  }

  ngOnInit(): void {
    if (!this.notes) {
      this.notesService.load().subscribe((notesResponse: INote[]) => {
        this.notes = notesResponse;
      });
    }

    this.router.events
      .pipe(
        filter((event) => event instanceof ActivationEnd),
        map((routeEvent: ActivationEnd) =>
          parseInt(routeEvent.snapshot.params.noteId)
        ),
        switchMap((noteId) => {
          return this.notes
            ? []
            : this.notesService.load().pipe(
                map((notes) => {
                  this.notes = notes;
                  this.currentNote = this.notes.find(
                    (note) => note.id === noteId
                  );
                })
              );
        })
      )
      .subscribe();

    this.shareDateService.changeEmitted$.subscribe((data: IDataToEmit) => {
      if (data.event === NoteEvents.UPDATE) {
        this.currentNote = data.change.note;
        this.update(data.change.note);
      }
    });
  }
}
