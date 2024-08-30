import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { routes } from './pokedex-app.routes';
import { PokedexAppComponent } from './pokedex-app.component';
import { PokemonService } from './service/pokemon.service';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputSearchComponent } from './common/input-search/input-search.component';
import { PokemonsComponent } from './component/pokemon/pokemons.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  providers: [PokemonService, provideHttpClient(withInterceptorsFromDi())],
  declarations: [PokemonsComponent, InputSearchComponent, PokedexAppComponent],
  bootstrap: [PokedexAppComponent],
})
export class PokedexAppModule {}
