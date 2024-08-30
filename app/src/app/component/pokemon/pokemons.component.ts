import { Component, OnInit, ChangeDetectorRef, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from '../../service/pokemon.service';
import { Pokemon } from '../../model/pokemon';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css'],
})
export class PokemonsComponent implements OnInit {
  subject = new BehaviorSubject(true);
  subjectObs = this.subject.asObservable();
  pokemons: Pokemon[] = [];
  errorMessage: string | undefined;
  tableRef: HTMLTableElement | undefined;
  externalValue: string = '';
  nextPagingNumber: any;

  constructor(private router: Router, protected apiService: PokemonService) {}

  ngOnInit() {
    this.getPokemons();
  }

  goToDetails(name: string) {
    this.router.navigate(['/details'], { queryParams: { name } });
  }

  loadMore() {
    this.apiService.loadMore(this.nextPagingNumber).subscribe({
      next: (v) => {
        this.nextPagingNumber = v.next;
        this.pokemons = v.results;
      },
      error: (e) => (this.errorMessage = <any>e),
    });
  }

  getPokemons() {
    this.apiService.getPokemons().subscribe({
      next: (v) => {
        this.nextPagingNumber = v.next;
        this.pokemons = v.results;
      },
      error: (e) => (this.errorMessage = <any>e),
      complete: () => this.subject.next(false),
    });
  }
}
