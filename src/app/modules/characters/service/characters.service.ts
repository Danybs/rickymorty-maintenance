import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Characters } from '../interface/character.interface';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private readonly API_URL = 'https://rickandmortyapi.com/api/character';

  private readonly httpClient = inject(HttpClient);

  getCharacters({
    offset: page = 0,
  }: {
    offset: number;
  }): Observable<Characters> {
    let params = new HttpParams();

    if (page > 0) {
      // sumamos 1 en la pagina ya que en la documentacion empezamos en 1?
      // la siguiente pagina es 2.
      params = params.set('page', (page + 1).toString());
    }

    return this.httpClient.get<Characters>(this.API_URL, { params });
  }
}
