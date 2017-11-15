

export class Player {

    private stack: number;
    private currentMessage: string;
    private currentBet: number;

    constructor() {
        this.stack = 990;
        this.currentBet = 10;
        this.currentMessage = '';
    }

    get getCurrentBet(){
        return this.currentBet;
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

    winningHand(multiplier: number){
        let winnings = this.currentBet * multiplier;
        this.stack += this.currentBet + winnings;
        this.currentBet = 10;
        this.stack -= 10;
    }

    losingHand(){
        if(this.stack >= 10){
            this.stack -= 10;
            this.currentBet = 10;
        }else{
            this.currentMessage = 'Out of money :(';
            this.currentBet = 0;
        }
    }

    pushHand(){
        this.stack += this.currentBet;
        this.currentBet = 10;
        this.stack -= 10;
    }

}