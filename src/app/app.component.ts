import { Component, OnInit } from '@angular/core';
import { NotesService } from './shared/notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-notes';

  constructor(private notesService: NotesService) {}

  handleClick() {
    console.log('EEE');
  }

  create() {
    this.notesService
      .create({ id: 8, title: 'Big Note', text: 'Text' })
      .subscribe((data) => console.log(data));
  }

  ngOnInit(): void {
    this.notesService.load().subscribe((data) => console.log(data));
  }
}
