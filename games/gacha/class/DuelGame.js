const {callback} = require("pg/lib/native/query");

class DuelGame {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
    }

    async play(thread) {
        let round = 1;
        while (this.player1.hp > 0 && this.player2.hp > 0) {
            await thread.send(`Round ${round}`);

            if (this.player1.attackSuccess()) {
                const damage = this.player1.attack;
                this.player2.takeDamage(damage > 0 ? damage : 0);
                await thread.send(`${this.player1.name} inflicted ${damage > 0 ? damage : 0} damage points to ${this.player2.name}.`);
            } else {
                await thread.send(`${this.player1.name} missed their attack.`);
            }

            if (this.player2.hp > 0 && this.player2.attackSuccess()) {
                const damage = this.player2.attack;
                this.player1.takeDamage(damage > 0 ? damage : 0);
                await thread.send(`${this.player2.name} inflicted ${damage > 0 ? damage : 0} damage points to ${this.player1.name}.`);
            } else if (this.player2.hp > 0) {
                await thread.send(`${this.player2.name} missed their attack.`);
            }
            if (this.player1.hp <= 0 || this.player2.hp <= 0) {
                break;
            }
            await thread.send(`Remaining HP: ${this.player1.name} (${this.player1.hp}), ${this.player2.name} (${this.player2.hp})`);
            round++;
        }
        await this.verifyWinner(thread);
    }
    async verifyWinner(thread) {
        if (this.player1.hp <= 0 && this.player2.hp <= 0) {
            await thread.send("It's a tie!");
            return true;
        } else if (this.player1.hp <= 0 || this.player2.hp <= 0) {
            await thread.send(`${this.player2.name} won!`);
            return true;
        } else {
            return false;
        }
    }
}

module.exports = {
    DuelGame,
}