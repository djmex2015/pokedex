import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../service/pokemon.service';
import Detail from '../../model/detail';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  detail: Detail | undefined;
  errorMessage: string | undefined;

  constructor(
    protected apiService: PokemonService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const name = this.route.snapshot.queryParamMap.get('name');
    this.apiService.getDetail(name == null ? '' : name).subscribe({
      next: (v) => {
        this.detail = v;
      },
      error: (e) => (this.errorMessage = <any>e),
    });
  }
}
