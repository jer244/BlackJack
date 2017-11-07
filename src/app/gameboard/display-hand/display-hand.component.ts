import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../../interfaces/card.interface';

@Component({
  selector: 'bj-display-hand',
  templateUrl: './display-hand.component.html',
  styleUrls: ['./display-hand.component.scss']
})
export class DisplayHandComponent implements OnInit {

  @Input() dealerHand: boolean;
  @Input() cards: Card[];

  constructor() { }

  ngOnInit() {
  }


}
