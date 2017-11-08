import { Component, OnInit } from '@angular/core';
import { DealerService } from './dealer.service';
import { Card } from '../interfaces/card.interface';
import { Hand } from './hand';

@Component({
  selector: 'bj-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss']
})
export class GameboardComponent implements OnInit {

  //CONTROL WHERE ACTION IS - 0 = DEALER; X = PLAYERX
  action: number = 0; 
  //HARD CODING PLAYERS TO 2 (1 PLUS DEALER)
  //TODO: CHANGE TO VARIABLE WHEN IMPLEMENTING ABILITY TO PLAY MULTIPLE HANDS
  numberOfPlayers: number = 2;
  //ARRAY OF HAND OBJECTS
  //DEALER = hands[0]
  //PLAYERX = hands[x] - i.e. PLAYER1 = hands[1]
  hands: Hand[];
  holeCard: Card = {
    code: 'HOLE',
    image: '',
    images: {},
    suit: '',
    value: '0'
  };

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
    this.hands=[];
    //PUSH HAND FOR DEALER AND SAVE THE HOLE CARD IN THE DEALERSERVICE
    this.hands.push(new Hand());
    this.hands[0].cards.push(this.holeCard);

    this.dealer.saveHole();
    //ADD A HAND FOR EACH PLAYER (INCLUDING THE DEALER) AND DEAL FIRST CARD TO EACH HAND
    for(let i = 1; i<this.numberOfPlayers; i++){
      this.hands.push(new Hand());
      this.hands[i].cards.push(this.dealer.getCard());
    }
    //DEAL 2ND CARD TO EACH HAND
    for(let i = 0; i<this.numberOfPlayers; i++){
      this.hands[i].cards.push(this.dealer.getCard());
    }
    //GIVE CONTROL TO PLAYER
    this.action = 1;
  }
}