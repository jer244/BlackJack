import { Card } from "../interfaces/card.interface";

export class Hand {

    cards: Card[];

    hasAce: boolean;

    hasBlackJack: boolean;

    isPlayingHand: boolean;

    finalCount: number;
    showBetChip: boolean;
    showWinChip: boolean;


    constructor() {
        this.cards = [];
        this.finalCount = 0;
        this.hasAce = false;
        this.hasBlackJack = false;
        this.isPlayingHand = true;
        this.showBetChip = true;
        this.showWinChip = false;
    };

    get count() {
        let count = 0;
        this.cards.forEach((element) => {
            switch (element.value) {
                case 'JACK':
                case 'QUEEN':
                case 'KING':
                    count += 10;
                    break;
                case 'ACE':
                    count += 1;
                    this.hasAce = true;
                    break;
                default:
                    count += Number(element.value);
            }
        })
        return (count);
    }

    checkBlackjack() {
        if (this.hasAce && this.cards.length == 2 && this.count == 11) {
            this.hasBlackJack = true;
        }
    }

    calcFinalCount() {
        this.finalCount = this.count;
        if(this.hasAce && this.finalCount <= 11){
            this.finalCount += 10;
        }
    }

    payWinningHand(){
        this.showWinChip = true;
    }
}
