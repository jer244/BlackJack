import { Card } from "../interfaces/card.interface";

export class Hand {

    cards: Card[];

    hasAce: boolean;

    isBlackJack: boolean;

    constructor() {
        this.cards = [];
        this.hasAce = false;
        this.isBlackJack = false;
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
}
