import { Component, OnInit } from '@angular/core';
import { from, map, mergeMap } from 'rxjs';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public allPokemon: any[] = [];
  public nextUrl: string | undefined
  public   imagemAtiva: number = -1; 

  constructor(
    private pokemonService: PokemonService,
  ) { }

  ngOnInit(): void {
    this.loadMorePokemon();
  }

  ativarImagem(index: number) {
    this.imagemAtiva = index;
  }

  desativarImagem() {
    this.imagemAtiva = -1;
  }

  loadMorePokemon(): void {
    this.pokemonService.getAllPokemon(this.nextUrl)
      .subscribe(response => {
        const results = response.results;
        results.forEach((pokemon: any) => {
          this.pokemonService.getPokemonDetails(pokemon.url)
            .subscribe(pokemonDetails => {
              this.allPokemon.push(pokemonDetails);
              console.log(this.allPokemon)
            });
        });
        this.nextUrl = response.next;
      });
  }

}
