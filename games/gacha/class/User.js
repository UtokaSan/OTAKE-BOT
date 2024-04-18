const {pgClient} = require("../../../database/database_config");
const {deleteCard} = require("../../../database/controllers/card_controller");

class User {
    constructor(id, money, cards) {
        this._id = id;
        this._money = money;
        this._cards = cards;
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
}

module.exports = {
    User,
}