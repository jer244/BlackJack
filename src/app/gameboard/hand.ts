import { Card } from "../interfaces/card.interface";

export class Hand {

    cards: Card[];

    hasAce: boolean;

    hasBlackJack: boolean;

    isPlayingHand: boolean;

    constructor() {
        this.cards = [];
        this.hasAce = false;
        this.hasBlackJack = false;
        this.isPlayingHand = true;
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

    checkBlackjack(){
        if(this.hasAce && this.cards.length==2 && this.count==11){
            this.hasBlackJack = true;
        }
    }
}
