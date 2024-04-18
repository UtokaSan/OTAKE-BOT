const {pgClient} = require("../../../database/database_config");
const {User} = require("./User");
const {deleteCard} = require("../../../database/controllers/card_controller");
const {createItemShop} = require("../../../database/controllers/shop_controller");

class Shop {
    async sellCard(user, cardId){
        const cardRes = await pgClient.query("SELECT * FROM cards WHERE id = $1", [cardId]);
        const card = cardRes.rows[0];
        if (card.owner_id === user.id){
            user._money += card.price;
            await user.updateMoney();
            await pgClient.query('UPDATE cards SET owner_id = NULL WHERE id = $1', [cardId]);
            await this.addCardToShop(cardId, card.price);
        } else {
            console.log("You don't own this card");
        }
    }

    async buyCard(user, cardId){
        const cardRes = await pgClient.query("SELECT * FROM cards WHERE id = $1", [cardId]);
        const card = cardRes.rows[0];
        if (card.owner_id === null){
            if (user._money >= card.price){
                user._money -= card.price;
                await user.updateMoney();
                await pgClient.query('UPDATE cards SET owner_id = $1 WHERE id = $2', [user.id, cardId]);
                await pgClient.query('DELETE FROM shop WHERE id_card = $1', [cardId]);
            } else {
                console.log("You don't have enough money");
            }
        } else {
            console.log("This card is already owned by someone else");
        }
    }

    async addCardToShop(cardId, price){
        await createItemShop(cardId, price);
    }
    async showShop(){
        const res = await pgClient.query("SELECT * FROM shop");
        let shop = [];
        res.rows.forEach(item => {
            shop.push({
                id: item.id_card,
                price: item.price
            });
        });
        console.log(shop);
    }
    async getAvailableCards(){
        const res = await pgClient.query("SELECT * FROM shop");
        let shop = [];
        res.rows.forEach(item => {
            shop.push({
                id: item.id_card,
                price: item.price
            });
        });
        return shop;
    }
}
module.exports = {
    Shop,
}