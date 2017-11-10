

export class Player {

    private stack: number;
    private currentBet: number;

    constructor() {
        this.stack = 990;
        this.currentBet = 10;
    }

    playerBet(amount: string) {
        if (amount == 'add100' && this.stack >= 100) {
            this.currentBet += 100;
            this.stack -= 100;
            return;
        } else if (amount == 'add10' && this.stack >= 10) {
            this.currentBet += 10;
            this.stack -= 10;
        } else if (amount == 'sub100' && this.currentBet >= 110) {
            this.currentBet -= 100;
            this.stack += 100;
        } else if (amount == 'sub10' && this.currentBet >= 20) {
            this.currentBet -= 10;
            this.stack += 10;
        }

    }

    settleBet(didWin: boolean) {
        if (didWin) {
            this.stack += this.currentBet;
        }
        else {
            this.stack -= this.currentBet;
        } if (this.stack >= 10) {
            this.currentBet = 10;
            this.stack -=10;
        } else {
            this.currentBet = 0;
        }
    }


}