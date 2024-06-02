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
}

module.exports = {
    User,
}