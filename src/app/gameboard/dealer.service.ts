import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Card } from '../interfaces/card.interface';

@Injectable()
export class DealerService {

  currentDeckId: string;
  currentShoe: Card[] = [];
  topCard: number = 0;
  private holeCard: Card;

  constructor(private http: HttpClient) { }

  newDeck() {
    this.http.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
      .subscribe((response) => {
        this.currentDeckId = response['deck_id'];
        this.fillShoe();
      })
  }

  fillShoe() {
    this.http.get(`https://deckofcardsapi.com/api/deck/${this.currentDeckId}/draw/?count=312`)
      .subscribe(response => {
        this.currentShoe = response['cards'];
      });
  }

  shuffleDeck() {
    if (!this.currentDeckId) {
      this.newDeck();
    } else {
      this.http.get(`https://deckofcardsapi.com/api/deck/${this.currentDeckId}/shuffle/`).
        subscribe(response => this.fillShoe());
    }
  }

  getCard<Card>() {
    if (this.topCard < 300) {
      this.topCard++;
      return this.currentShoe[this.topCard - 1];
    }
  }

  saveHole(){
    if(this.topCard<300){
      this.topCard++;
      this.holeCard = this.currentShoe[this.topCard -1];
    }
  }

  getHole(){
    if(this.holeCard){
      return this.holeCard;
    }
  }
}