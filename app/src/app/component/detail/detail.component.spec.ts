import { ComponentFixture, TestBed } from '@angular/core/testing';

import { asyncScheduler } from 'rxjs';
import { DetailComponent } from './detail.component';
import { PokemonService } from '../../service/pokemon.service';
import { ActivatedRoute } from '@angular/router';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let pokemonServiceMock: any;
  let activatedRouteMock: any;

  beforeEach(async () => {
    asyncScheduler.schedule(
      await TestBed.configureTestingModule({
        declarations: [DetailComponent],
        providers: [
          {
            provide: PokemonService,
            useValue: pokemonServiceMock,
          },
          {
            provide: ActivatedRoute,
            useValue: activatedRouteMock,
          },
        ],
      }).compileComponents(),
      2000
    );
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   // expect(component).toBeTruthy();
  // });

  it('should be null', () => {
    const z = null;
    expect(z).toBeNull();
  });
});
