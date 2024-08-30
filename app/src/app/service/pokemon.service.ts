import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../model/pokemon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Detail from '../model/detail';

@Injectable()
export class PokemonService {
  private baseUrl = 'http://localhost:3000/api/pokemon';

  constructor(private http: HttpClient) {}

  getPokemons(limit: number = 0, offset: number = 0): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: 'Bearer your-auth-token', //
    });
    return this.http.post<any>(this.baseUrl, { limit, offset }, { headers });
  }

  search(
    name: string,
    limit: number = 20,
    offset: number = 0
  ): Observable<Pokemon[]> {
    return this.http.post<Pokemon[]>(`${this.baseUrl}/search/${name}`, {
      limit,
      offset,
    });
  }

  loadMore(nextUrl: string): Observable<any> {
    return this.http.get<any>(nextUrl);
  }

  getDetail(name: string): Observable<Detail> {
    return this.http.get<Detail>(`${this.baseUrl}/details/${name}`);
  }
}
