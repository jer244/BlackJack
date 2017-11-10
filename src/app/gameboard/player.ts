

export class Player {

    private stack: number;
    private currentBet: number;

    constructor(){
        this.stack = 1000;
        this.currentBet = 10;
    }

    playerBet(amount: number){
        this.currentBet = amount;
    }

    settleBet(didWin: boolean){
        if(didWin){
            this.stack+=this.currentBet;
        }
        else{
            this.stack-=this.currentBet;
        }
        this.currentBet=10;
    }


}