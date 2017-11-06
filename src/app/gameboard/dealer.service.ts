import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Card } from '../interfaces/card.interface';

@Injectable()
export class DealerService {

  currentDeckId: string;
  currentShoe: Card[] = [];
  topCard: number = 0;
  dealerStack: Card[] = [];
  playerStack: Card[] = [];

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
    this.dealerStack.push(this.currentShoe[this.topCard]);
    this.playerStack.push(this.currentShoe[this.topCard+1]);
    this.dealerStack.push(this.currentShoe[this.topCard+2]);
    this.playerStack.push(this.currentShoe[this.topCard+3]);
    this.topCard += 4;
    console.log(this.dealerStack, this.playerStack);
  }
}