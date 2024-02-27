import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) { }

  getAllPokemon(url: string = this.baseUrl + 'pokemon/?limit=12'): Observable<any> {
    return this.http.get<any>(url);
  }

  getPokemonDetails(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  getAllPokemonType(type: any): Observable<any> {
    const url = `${this.baseUrl}type/${type}`;
    return this.http.get<any>(url);
  }

}