import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  firstValueFrom,
  Observable,
  Subject,
  Subscription,
  switchMap,
} from 'rxjs';
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
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [CharactersService],
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersComponent implements OnInit, OnDestroy {
  offset = 0;
  limit = 20;
  private subscriptions: Subscription[] = [];
  private readonly _characterService = inject(CharactersService);
  charactersSubject: BehaviorSubject<Characters | null> =
    new BehaviorSubject<Characters | null>(null);
  characters$: Observable<Characters | null> =
    this.charactersSubject.asObservable();
  private searchSubject = new Subject<string>();
  name = '';

  async ngOnInit(): Promise<void> {
    this.charactersSubject.next(
      await firstValueFrom(this.loadCharacters(this.offset)),
    );
    this.subscriptions.push(
      this.searchSubject
        .pipe(
          debounceTime(300),
          distinctUntilChanged(), // distinguimos que el valor sea diferente
          switchMap((name: string): Observable<Characters> => {
            this.offset = 0;
            return this.loadCharacters(this.offset, { name: name });
          }), // cancelamos la busqueda anterior si un usuario teclea, si no devolvemos el observable ( parecido al abort controller)
          catchError((error, originalObservable) => {
            console.error('error en la busqueda', error);
            this.charactersSubject.next(null);
            return originalObservable;
          }),
        )
        .subscribe((characters: Characters | null) => {
          this.charactersSubject.next(characters);
        }),
    );
  }

  loadCharacters = (offset: number, filters = {}): Observable<Characters> =>
    this._characterService.getCharacters({ offset, filters });

  onSearch(searchTerm: any): void {
    this.searchSubject.next(searchTerm.target.value);
  }

  async handlePageEvent(event: PageEvent): Promise<void> {
    this.limit = event.pageSize;
    this.offset = event.pageIndex;
    //sumamos +1 ya que page 0 y page=1 es lo mismo, pero en el componente paginacion
    // empezamos en 0
    this.charactersSubject.next(
      await firstValueFrom(
        this.loadCharacters(event.pageIndex + 1, {
          name: this.name,
        }),
      ),
    );
    globalThis.window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe(),
    );
  }
}
