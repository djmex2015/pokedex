import { Component, Input, OnInit } from '@angular/core';
import { PokemonsComponent } from '../../component/pokemon/pokemons.component';
import { PokemonService } from '../../service/pokemon.service';
import { Pokemon } from '../../model/pokemon';

@Component({
  selector: 'input-search',
  template: `
    <label class="searchInfo">Search:</label>
    <input
      class="form-control input-sm"
      [(ngModel)]="externalValue"
      (ngModelChange)="updateData($event)"
    />
  `,
})
export class InputSearchComponent implements OnInit {
  @Input('externalValue') externalValue: any;

  errorMessage: string | undefined;

  ngOnInit(): void {
    this.pokemonsComponent.subject.subscribe(() => (this.externalValue = null));
  }

  constructor(
    protected apiService: PokemonService,
    protected pokemonsComponent: PokemonsComponent
  ) {}

  updateData(newValue: string): void {
    this.apiService.search(newValue).subscribe({
      next: (v: any) => {
        this.pokemonsComponent.pokemons = [];
        const pokemon = new Pokemon(v.name, v.forms[0].url);
        this.pokemonsComponent.pokemons.push(pokemon);
      },
      error: (e) => (this.errorMessage = <any>e),
    });
  }
}
