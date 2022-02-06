import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface INote {
  id: number;
  title: string;
  text: string;
}

@Injectable({ providedIn: 'root' })
export class NotesService {
  static baseUrl = 'http://localhost:8080/notes';

  constructor(private http: HttpClient) {}

  load(): Observable<INote[]> {
    return this.http.get<INote[]>(NotesService.baseUrl);
  }

  create(note: INote): Observable<INote> {
    return this.http.post<any>(NotesService.baseUrl, note);
  }

  delete(noteId: INote['id']): Observable<INote> {
    return this.http.delete<any>(`${NotesService.baseUrl}/${noteId}`);
  }

  update(note: INote): Observable<INote[]> {
    return this.http.put<any>(`${NotesService.baseUrl}/${note.id}`, note);
  }
}
