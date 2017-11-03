import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DealerService {

  currentDeckId: String;

  constructor(private http: HttpClient) { }

  newDeck(count: Number) {
    this.http.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${count}`)
      .subscribe((response) => {
        this.currentDeckId = response['deck_id'];
        this.fillShoe(this.currentDeckId);
      })
  }

  fillShoe(deckId: String) {
    this.http.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .subscribe( response => console.log(response));
  }
}