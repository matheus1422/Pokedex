import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon-type',
  templateUrl: './pokemon-type.component.html',
  styleUrls: ['./pokemon-type.component.css']
})
export class PokemonTypeComponent implements OnInit {

  allPokemonType: any[] = [];
  itemsPerPage: number = 10;
  currentIndex: number = 0;
  nextUrl: string | undefined

  public typeUrl: string | null | undefined;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.typeUrl = params.get('type');
    });

    this.loadPokemon()
  }

  loadPokemon(): void {
    this.pokemonService.getAllPokemonType(this.typeUrl).subscribe((data) => {
      const newPokemon = data.pokemon.slice(this.currentIndex, this.currentIndex + this.itemsPerPage);
      this.loadPokemonDetails(newPokemon);
    });
  }

  loadPokemonDetails(pokemonList: any[]): void {
    for (let pokemon of pokemonList) {
      this.pokemonService.getPokemonDetails(pokemon.pokemon.url).subscribe((data: any) => {
        this.allPokemonType.push(data);
        console.log(this.allPokemonType)
      });
    }
  }

  loadMorePokemon(): void {
    this.currentIndex += this.itemsPerPage;
    this.loadPokemon();
  }

  isNextPageAvailable(): boolean {
    return this.currentIndex + this.itemsPerPage < this.allPokemonType.length;
  }

}
