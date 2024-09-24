import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { Characters } from '../interface/character.interface';
import { CharactersService } from '../service/characters.service';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
  ],
  providers: [CharactersService],
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersComponent implements OnInit {
  offset = 0;
  limit = 20;

  private readonly _characterService = inject(CharactersService);
  loadCharacters = (offset: number): Observable<Characters> =>
    this._characterService.getCharacters({ offset });
  characters$: Observable<Characters> = this.loadCharacters(this.offset);

  ngOnInit(): void {}

  handlePageEvent(event: PageEvent): void {
    this.limit = event.pageSize;
    this.offset = event.pageIndex;
    this.characters$ = this.loadCharacters(event.pageIndex);
  }
}
