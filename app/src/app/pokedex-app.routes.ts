import { Routes } from '@angular/router';
import { PokemonsComponent } from './component/pokemon/pokemons.component';
import { DetailComponent } from './component/detail/detail.component';

export const routes: Routes = [
  { path: 'pokemons', component: PokemonsComponent },
  { path: 'details', component: DetailComponent },
  { path: '', redirectTo: 'pokemons', pathMatch: 'full' },
  { path: '**', redirectTo: 'pokemons', pathMatch: 'full' },
];
