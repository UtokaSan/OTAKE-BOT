const {pgClient} = require("../../../database/database_config");
const {deleteCard} = require("../../../database/controllers/card_controller");

class User {
    _money = 0;
    _cooldown = 0;
    constructor(id, cards) {
        this._id = id;
        this._cards = cards;
        this.init();
    }

    async init() {
        this._money = await this.takeGold();
        this._cooldown = await this.takeCooldown();
    }

    get id() {
        return this._id;
    }
    async updateMoney() {
        await pgClient.query('UPDATE users SET money = $1 WHERE discord_id = $2', [this._money, this.id]);
    }

    removeCard(card) {
        deleteCard(card.id).then(r => {
            console.log("Card removed");
        });
    }
    addCard(card) {
        this._cards.push(card);
    }

    get money() {
        return this._money;
    }
    get cards() {
        return this._cards;
    }
    set money(value) {
        this._money = value;
    }
    async takeGold() {
        try {
            const res = await pgClient.query("SELECT money FROM users WHERE discord_id = $1", [this.id]);
            return res.rows[0].money;
        } catch (err) {
            console.log(err);
        }
    }
    async addCooldown() {
        await pgClient.query("UPDATE users SET cooldownreward = NOW() WHERE discord_id = $1", [this.id]);
        console.log("Cooldown added");
    }
    async takeCooldown() {
        try {
            const res = await pgClient.query("SELECT EXTRACT(EPOCH FROM (NOW() - cooldown_quizz)) AS time_elapsed FROM cooldown_reward WHERE discord_id = $1", [this.id]);
            const timeElapsed = res.rows[0].time_elapsed;
            const totalCooldown = 86400;
            const timeRemaining = totalCooldown - timeElapsed;
            const hours = Math.floor(timeRemaining / 3600);
            const minutes = Math.floor((timeRemaining % 3600) / 60);
            const seconds = Math.floor(timeRemaining % 60);
            return { hours, minutes, seconds };
        } catch (err) {
            console.log(err);
        }
    }
    get cooldown() {
        return this._cooldown;
    }
}

module.exports = {
    User,
}