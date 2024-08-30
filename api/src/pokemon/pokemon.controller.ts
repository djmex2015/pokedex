import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { PokemonService } from "./pokemon.service";

@Controller("pokemon")
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  findAll(@Body() paging: { limit: number; offset: number }) {
    return this.pokemonService.findAll(paging);
  }

  @Post("search/:name")
  search(@Param("name") name: string, @Body() paging: { limit: number; offset: number }) {
    return this.pokemonService.search(name, paging);
  }

  @Get("details/:name")
  getDetails(@Param("name") name: string) {
    return this.pokemonService.getDetails(name);
  }
}
