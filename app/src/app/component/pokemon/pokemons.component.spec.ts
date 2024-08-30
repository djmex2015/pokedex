import { ComponentFixture, TestBed } from '@angular/core/testing';

import { asyncScheduler } from 'rxjs';
import { PokemonsComponent } from './pokemons.component';
import { PokemonService } from '../../service/pokemon.service';
import { InputSearchComponent } from '../../common/input-search/input-search.component';

describe('PokemonsComponent', () => {
  let component: PokemonsComponent;
  let fixture: ComponentFixture<PokemonsComponent>;
  let pokemonService: any;

  beforeEach(async () => {
    asyncScheduler.schedule(
      await TestBed.configureTestingModule({
        declarations: [PokemonsComponent, InputSearchComponent],
        providers: [
          {
            provide: PokemonService,
            useValue: pokemonService,
          },
        ],
      }).compileComponents(),
      2000
    );
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render url in a td tag', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('td').textContent).toContain('http');
  });
});
