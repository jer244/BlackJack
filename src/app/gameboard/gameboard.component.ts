import { Component, OnInit } from '@angular/core';
import { DealerService } from './dealer.service';

@Component({
  selector: 'bj-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss']
})
export class GameboardComponent implements OnInit {

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
}