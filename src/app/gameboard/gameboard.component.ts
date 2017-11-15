import { Component, OnInit } from '@angular/core';
import { DealerService } from './dealer.service';
import { Card } from '../interfaces/card.interface';
import { Hand } from './hand';
import { Player } from './player';

@Component({
  selector: 'bj-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss']
})
export class GameboardComponent implements OnInit {

  //CONTROL WHERE ACTION IS [0 = DEALER] [X = PLAYERX] [-1 = PLACEBETS]
  action: number;
  //HARD CODING PLAYERS TO 2 (1 PLUS DEALER)
  //TODO: CHANGE TO VARIABLE WHEN IMPLEMENTING ABILITY TO PLAY MULTIPLE HANDS
  numberOfPlayers: number = 2;
  //ARRAY OF HAND OBJECTS
  //DEALER = hands[0]
  //PLAYERX = hands[x] - i.e. PLAYER1 = hands[1]
  hands: Hand[];
  players: Player[] = [];
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
    this.players.push(new Player);  //DEALER
    this.players.push(new Player);  //PLAYER1
    this.action = -1;
  }

  shuffle() {
    this.dealer.shuffleDeck();
  }

  newDeck() {
    this.dealer.newDeck();
  }

  dealHand() {
    this.hands = [];
    //ADD A HAND FOR EACH PLAYER (INCLUDING THE DEALER)
    //CHECK IF PLAYER HAS ENOUGH $ TO MAKE MIN BET
    //DEAL FIRST CARD TO EACH HAND
    for (let i = 0; i < this.numberOfPlayers; i++) {
      this.hands.push(new Hand());
      if (this.players[i].getCurrentBet < 10) {
        this.hands[i].isPlayingHand = false;
        continue;
      }
      this.hands[i].cards.push(this.dealer.getCard());
    }
    //DEAL 2ND CARD TO EACH HAND
    for (let i = 0; i < this.numberOfPlayers; i++) {
      if (this.hands[i].isPlayingHand) {
        this.hands[i].cards.push(this.dealer.getCard());
        this.hands[i].count;
        this.hands[i].checkBlackjack();
      }
    }
    //CHECK FOR DEALER BLACKJACK
    if(this.hands[0].hasBlackJack){
      this.dealerHasBlackjack();
      return;
    }
    //PAY PLAYER BLACKJACKS
    this.hands.forEach((hand, index) => {
      if(index > 0 && hand.hasBlackJack){
        this.players[index].winningHand(1.5);
        this.hands[index].isPlayingHand = false;
      }
    })
    //GIVE CONTROL TO PLAYER
    this.action = this.numberOfPlayers - 1;
  }

  dealerHasBlackjack(){
    this.action = 0;
    this.hands.forEach((hand, index)=>{
      hand.hasBlackJack ? this.players[index].pushHand() : this.players[index].losingHand();
    });
    this.action = -1;
  }

  playerHit(player) {
    this.hands[player].cards.push(this.dealer.getCard());
    if (this.hands[player].count > 21) {
      console.log('bust');
      this.action--;
      if (this.action == 0) {
        this.dealerReveal();
      }
      return;
    }
    return;
  }

  playerStay(player) {
    this.action--;
    if (this.action == 0) {
      this.dealerReveal();
    }
    return;
  }

  playerDouble(player) {
    this.hands[player].cards.push(this.dealer.getCard());
    this.action--;
    if (this.action == 0) {
      this.dealerReveal();
    }
    return;
  }

  dealerReveal() {
    while (this.hands[0].count < 17 && !(this.hands[0].hasAce && this.hands[0].count + 10 > 16 && this.hands[0].count + 10 < 22)) {
      this.hands[0].cards.push(this.dealer.getCard());
    }
    this.settleBets();
    this.action = -1;
  }

  settleBets() {

  }

  playerBet(amount) {
    this.players[1].playerBet(amount);
  }

}