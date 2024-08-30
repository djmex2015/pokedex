import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom, map, Observable } from "rxjs";
import { AxiosResponse } from "axios";
import Detail from "./detail";

@Injectable()
export class PokemonService {
  private baseUrlPokemon: string = "https://pokeapi.co/api/v2/pokemon";

  constructor(private readonly httpService: HttpService) {}

  findAll(paging: any): Observable<any> {
    return this.httpService
      .get(`${this.baseUrlPokemon}?limit=${paging.limit}&offset=${paging.offset}`)
      .pipe(map((response: AxiosResponse) => response.data));
  }

  search(name: string, paging: any): Observable<any> {
    return this.httpService
      .get(`${this.baseUrlPokemon}/${name}?limit=${paging.limit}&offset=${paging.offset}`)
      .pipe(map((response: AxiosResponse) => response.data));
  }

  getDetails(name: string): Observable<any> {
    return this.httpService
      .get(`${this.baseUrlPokemon}/${name}`)
      .pipe(map((response: AxiosResponse) => this.processDetails(response.data)));
  }

  async fetchExtraData(data: any): Promise<any> {
    const promiseLocation = firstValueFrom(
      this.httpService.get(data.location_area_encounters).pipe(map((response: AxiosResponse) => response))
    );
    const location = await Promise.resolve(promiseLocation);
    return { location: location.data };
  }

  async processDetails(data: any): Promise<Detail> {
    const details: Detail = new Detail();
    details.id = data.id;
    details.name = data.name;
    details.specie_name = data.species.name;
    details.sprite = data.sprites.front_default;
    details.abilities = data.abilities.map((res: { ability: { name: any } }) => res.ability.name).join(", ");
    await this.fetchExtraData(data).then((res) => {
      details.location_area_name =
        res["location"] != ""
          ? res["location"].map((res: { location_area: { name: any } }) => res.location_area.name).join(", ")
          : "---";
    });
    return details;
  }
}
