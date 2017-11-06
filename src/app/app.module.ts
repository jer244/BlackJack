import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './partials/navbar/navbar.component';
import { GameboardComponent } from './gameboard/gameboard.component';
import { LandingComponent } from './landing/landing.component';
import { RulesComponent } from './rules/rules.component';
import { StrategyComponent } from './strategy/strategy.component';
import { DealerService } from './gameboard/dealer.service';
import { DisplayHandComponent } from './gameboard/display-hand/display-hand.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GameboardComponent,
    LandingComponent,
    RulesComponent,
    StrategyComponent,
    DisplayHandComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [DealerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
