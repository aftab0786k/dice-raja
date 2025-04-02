export class Player {
    constructor(name, image, lastDice, score, lastMovement) {
        this.name = name;
        this.image = image;
        this.lastDice = lastDice;
        this.score = score;
        this.lastMovement = lastMovement;
    }
}

export class GameState {
    constructor(currentPlayer, playersCount, players, screen, winner) {
        this.currentPlayer = currentPlayer;
        this.playersCount = playersCount;
        this.players = players;
        this.screen = screen;
        this.winner = winner;
    }
}