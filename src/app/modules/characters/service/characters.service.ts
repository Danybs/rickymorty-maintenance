import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Characters } from '../interface/character.interface';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private readonly API_URL = 'https://rickandmortyapi.com/api';

  private readonly httpClient = inject(HttpClient);

  getCharacters(): Observable<Characters> {
    return this.httpClient.get<Characters>(`${this.API_URL}/character`);
  }
}
