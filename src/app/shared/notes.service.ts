import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Note {
  id: number;
  title: string;
  text: string;
}

@Injectable({ providedIn: 'root' })
export class NotesService {
  static path = '../../assets/db.json';

  constructor(private http: HttpClient) {}

  load(): Observable<Note[]> {
    return this.http.get<Note[]>(NotesService.path);
  }

  create(note: Note): Observable<Note> {
    return this.http.post<any>(NotesService.path, note);
  }
}
