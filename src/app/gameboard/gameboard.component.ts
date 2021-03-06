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
  dealerMessage: string;
  //HARD CODING PLAYERS TO 2 (1 PLUS DEALER)
  //TODO: CHANGE TO VARIABLE WHEN IMPLEMENTING ABILITY TO PLAY MULTIPLE HANDS
  numberOfPlayers: number = 2;
  hands: Hand[];    //DEALER = hands[0]
  players: Player[] = [];

  constructor(private dealer: DealerService) { }

  ngOnInit() {
    this.dealer.newDeck();
    this.players.push(new Player);  //DEALER
    this.players.push(new Player);  //PLAYER1
    this.action = -1;
    this.dealerMessage = "Place Bets";
    this.hands = [];
    this.hands.push(new Hand);    //DEALER  
    this.hands.push(new Hand);    //PLAYER1
  }

  shuffle() {
    this.dealer.shuffleDeck();
  }

  newDeck() {
    this.dealer.newDeck();
  }

  dealHand() {
    this.dealerMessage = "";
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
    if (this.hands[0].hasBlackJack) {
      this.settleDealerBlackjack();
      return;
    }
    //PAY PLAYER BLACKJACKS
    this.hands.forEach((hand, i) => {
      if (i > 0 && hand.hasBlackJack) {
        this.players[i].winningHand(1.5);
        this.hands[i].showWinningChips();
      }
    })
    //GIVE CONTROL TO PLAYER
    this.moveAction();
  }

  settleDealerBlackjack() {
    this.action = 0;
    this.hands.forEach((hand, i) => {
      if (hand.hasBlackJack) {
        this.players[i].pushHand();
      } else {
        this.hands[i].takeLosingChips();
      }
    });
    this.action = -1;
  }

  playerHit(player) {
    this.hands[player].cards.push(this.dealer.getCard());
    if (this.hands[player].count > 21) {
      this.hands[player].takeLosingChips();
      this.hands[player].isPlayingHand = false;
      this.moveAction();
    }
    return;
  }

  playerStay(player) {
    this.hands[player].calcFinalCount();
    this.moveAction();
  }

  moveAction() {
    if (this.action == -1) {
      this.action = this.numberOfPlayers - 1;
    } else {
      this.action--;
    }
    while ((!this.hands[this.action].isPlayingHand || this.hands[this.action].hasBlackJack) && this.action != 0) {
      this.action--;
    }
    if (this.action == 0) {
      this.dealerReveal();
    }
  }

  playerDouble(player) {
    this.players[player].doubleBet();
    this.hands[player].cards.push(this.dealer.getCard());
    this.hands[player].calcFinalCount();
    if (this.hands[player].finalCount > 21) {
      this.hands[player].takeLosingChips();
      this.hands[player].isPlayingHand = false;
    }
    this.moveAction();
  }

  dealerReveal() {
    while (this.hands[0].count < 17 && !(this.hands[0].hasAce && this.hands[0].count + 10 > 16 && this.hands[0].count + 10 < 22)) {
      this.hands[0].cards.push(this.dealer.getCard());
    }
    if (this.hands[0].count > 21) {
      this.settleBets(true);
    } else {
      this.hands[0].calcFinalCount();
      this.settleBets(false);
    }
  }

  //NEED TO ACCOUNT FOR SOFT COUNTS
  settleBets(dealerBust: boolean) {
    for (let i = this.players.length - 1; i > 0; i--) {
      if (!this.hands[i].isPlayingHand || this.hands[i].hasBlackJack) {
        continue;
      }
      if (dealerBust) {
        this.players[i].winningHand(1);
        this.hands[i].showWinningChips();
      } else
        if (this.hands[0].finalCount == this.hands[i].finalCount) {
          this.players[i].pushHand();
        } else
          if (this.hands[0].finalCount > this.hands[i].finalCount) {
            this.hands[i].takeLosingChips();
          } else {
            this.players[i].winningHand(1);
            this.hands[i].showWinningChips();
          }
    }
    setTimeout(() => {
      this.action = -1;
      this.players.forEach(e => e.resetBets());
      this.dealerMessage = "Place Bets"
    }, 2000)
  }

  playerBet(amount) {
    this.players[1].changePlayerBet(amount);
  }

}