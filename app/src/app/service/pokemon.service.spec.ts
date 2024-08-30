import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { PokemonService } from './pokemon.service';

const url = 'https://pokeapi.co/api/v2/pokemon/1';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpClientSpy: any;

  beforeEach(() => {
    httpClientSpy = {
      get: jest.fn(),
      post: jest.fn(),
    };
    service = new PokemonService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getPokemons', () => {
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of({}));
    service.getDetail('pikachu');
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);
  });

  it('should test search', (done) => {
    const urlSearch = 'https://pokeapi.co/api/v2/pokemon/search/pikachu';
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of({}));
    service.search('pikachu', 20, 40).subscribe({
      next: (data: any) => {
        expect(data).toEqual({});
        done();
      },
      error: (error: any) => console.log(error),
    });
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);
  });

  it('should getDetails throw error', (done) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found',
    });
    jest
      .spyOn(httpClientSpy, 'get')
      .mockReturnValue(throwError(() => errorResponse));
    service.getDetail('pikachu1').subscribe({
      next: (data: any) => console.log(data),
      error: (error: any) => {
        expect(error.message).toContain('404');
        done();
      },
    });
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);
  });

  it('should test getPokemons', () => {
    const command = 'testing';
    const url = 'https://pokeapi.co/api/v2/pokemon';
    jest.spyOn(httpClientSpy, 'post').mockReturnValue(of({}));
    service.getPokemons();
    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
  });
});
