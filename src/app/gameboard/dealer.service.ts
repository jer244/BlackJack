import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Card } from '../interfaces/card.interface';

@Injectable()
export class DealerService {

  currentDeckId: String;
  currentShoe: Card[] = [];
  topCard: Number = 0;

  constructor(private http: HttpClient) { }

  newDeck() {
    this.http.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
      .subscribe((response) => {
        this.currentDeckId = response['deck_id'];
        this.fillShoe();
      })
  }

  shuffleDeck() {
    if(!this.currentDeckId){
      this.newDeck();
    } else {
      this.http.get(`https://deckofcardsapi.com/api/deck/${this.currentDeckId}/shuffle/`).
      subscribe( response => this.fillShoe());
    }
  }

  fillShoe() {
    this.http.get(`https://deckofcardsapi.com/api/deck/${this.currentDeckId}/draw/?count=312`)
    .subscribe( response => {
      this.currentShoe = response['cards'];
    });
  }

  dealHand(){

  }
}