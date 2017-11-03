import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './partials/navbar/navbar.component';
import { GameboardComponent } from './gameboard/gameboard.component';
import { LandingComponent } from './landing/landing.component';
import { RulesComponent } from './rules/rules.component';
import { StrategyComponent } from './strategy/strategy.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GameboardComponent,
    LandingComponent,
    RulesComponent,
    StrategyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
