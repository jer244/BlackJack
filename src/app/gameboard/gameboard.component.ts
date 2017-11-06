import { Component, OnInit } from '@angular/core';
import { DealerService } from './dealer.service';
import { Card } from '../interfaces/card.interface';

@Component({
  selector: 'bj-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss']
})
export class GameboardComponent implements OnInit {

  dealerStack: Card[] = [];
  playerStack: Card[] = [];

  constructor(private dealer: DealerService) { }

  ngOnInit() {
    this.dealer.newDeck();
  }

  shuffle(){
    this.dealer.shuffleDeck();
  }

  newDeck(){
    this.dealer.newDeck(); 
  }

  dealHand(){
    this.dealerStack = [];
    this.playerStack = [];
    this.dealerStack.push(this.dealer.getCard());
    this.playerStack.push(this.dealer.getCard());
    this.dealerStack.push(this.dealer.getCard());
    this.playerStack.push(this.dealer.getCard());
    console.log(this.dealerStack, this.playerStack)
  }
}