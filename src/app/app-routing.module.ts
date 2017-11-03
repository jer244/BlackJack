import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameboardComponent } from './gameboard/gameboard.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component:  },
  {path: 'play', component: GameboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }