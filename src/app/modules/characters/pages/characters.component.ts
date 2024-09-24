import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
    OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
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
  ],
  providers: [CharactersService],
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersComponent implements OnInit {
  private readonly _cd = inject(ChangeDetectorRef);
  private readonly _characterService = inject(CharactersService);
  readonly characters$: Observable<Characters> =
    this._characterService.getCharacters();

  charactersSelected: number[] = [];

  ngOnInit(): void {
    // const a = firstValueFrom(this.characters$);
    // a.then((a) => console.log(a));
    // this._characterService.getCharacters();
  }
}
