import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameboardComponent } from './gameboard/gameboard.component';
import { LandingComponent } from './landing/landing.component';
import { RulesComponent } from './rules/rules.component';
import { StrategyComponent } from './strategy/strategy.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: LandingComponent },
  {path: 'play', component: GameboardComponent },
  {path: 'rules', component: RulesComponent },
  {path: 'strategy', component: StrategyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }