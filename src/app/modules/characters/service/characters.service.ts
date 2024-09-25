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

  fillParams(filters: Record<string, number | string | boolean>): HttpParams {
    let httpParams = new HttpParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        httpParams = httpParams.set(key, value);
      }
    });
    return httpParams;
  }

  getCharacters({
    filters,
    offset: page = 0,
  }: Partial<{
    filters: Partial<{ name: string }>;
    offset: number;
  }>): Observable<Characters> {
    const params = this.fillParams({ ...filters, page });
    return this.httpClient.get<Characters>(this.API_URL, { params });
  }

  getCharacter({ id }: { id: number }): Observable<Characters> {
    return this.httpClient.get<Characters>(
      `${this.API_URL}${id ? `/${id}` : ''}`,
    );
  }
}
