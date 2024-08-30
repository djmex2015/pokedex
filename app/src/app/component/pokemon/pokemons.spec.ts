import { Pokemon } from '../../model/pokemon';

describe('Pokemon', () => {
  it('should create an instance', () => {
    expect(new Pokemon('Pikachu', 'http://pikachu')).toBeTruthy();
  });
});
