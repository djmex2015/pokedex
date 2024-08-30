import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSearchComponent } from './input-search.component';
import { asyncScheduler } from 'rxjs';
import { PokemonService } from '../../service/pokemon.service';
import { PokemonsComponent } from '../../component/pokemon/pokemons.component';

describe('InputSearchComponent', () => {
  let component: InputSearchComponent;
  let fixture: ComponentFixture<InputSearchComponent>;
  let pokemonsMock: any;
  let pokemonServiceMock: any;

  beforeEach(async () => {
    asyncScheduler.schedule(
      await TestBed.configureTestingModule({
        declarations: [InputSearchComponent],
        providers: [
          {
            provide: PokemonsComponent,
            useValue: pokemonsMock,
          },
          {
            provide: PokemonService,
            useValue: pokemonServiceMock,
          },
        ],
      }).compileComponents(),
      2000
    );
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
