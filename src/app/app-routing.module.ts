import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./modules/characters/pages/characters.component').then(
        (m) => m.CharactersComponent,
      ),
  },
  // WIP
  // { path: '**', redirectTo: 'error.component' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
