const {pgClient} = require("../../../database/database_config");
const {User} = require("./User");
const {deleteCard} = require("../../../database/controllers/card_controller");
const {createItemShop} = require("../../../database/controllers/shop_controller");

class Shop {

    // This function is used to sell a card from the user
    // It will check if the user owns the card
    // If the user owns the card, it will update the user money and update the card owner
    // If the user doesn't own the card, it will reply to the user that he doesn't own the card
    // If the card is sold successfully, it will return true
    async sellCard(interaction, user, cardId){
        const cardRes = await pgClient.query("SELECT * FROM cards WHERE id = $1", [cardId]);
        const card = cardRes.rows[0];
        if (card === undefined){
            interaction.reply("This card doesn't exist");
            return false;
        }
        if (card.owner_id === user.id){
            user._money += card.price;
            await user.updateMoney();
            await pgClient.query('UPDATE cards SET owner_id = NULL WHERE id = $1', [cardId]);
            await this.addCardToShop(cardId, card.price);
            return true;
        } else {
            interaction.reply("You don't own this card");
            return false;
        }
    }

    // This function is used to buy a card from the shop
    // It will check if the user has enough money to buy the card
    // If the user has enough money, it will update the user money and update the card owner
    // If the user doesn't have enough money, it will reply to the user that he doesn't have enough money
    // If the card doesn't exist, it will reply to the user that the card doesn't exist
    // If the card is already owned by someone else, it will reply to the user that the card is already owned by someone else
    // If the card is bought successfully, it will return true
    async buyCard(interaction, user, cardId){
        const cardRes = await pgClient.query("SELECT * FROM cards WHERE id = $1", [cardId]);
        const card = cardRes.rows[0];
        if (card === undefined){
            interaction.reply("This card doesn't exist");
            return false;
        }
        if (card.owner_id === null){
            if (user._money >= card.price){
                user._money -= card.price;
                await user.updateMoney();
                await pgClient.query('UPDATE cards SET owner_id = $1 WHERE id = $2', [user.id, cardId]);
                await pgClient.query('DELETE FROM shop WHERE id_card = $1', [cardId]);
                return true;
            } else {
                interaction.reply("You don't have enough money to buy this card");
                return false;
            }
        } else {
            interaction.reply("This card is already owned by someone else")
            return false;
        }
    }

    async addCardToShop(cardId, price){
        await createItemShop(cardId, price);
    }

    // This function is used to show the shop to the user
    // Later, i will sort the cards by rarity
    async showShop(){
        const res = await pgClient.query("SELECT * FROM shop");
        const nameCard = await pgClient.query("SELECT * FROM cards");
        let shop = [];
        res.rows.forEach(item => {
            const cardName = nameCard.rows.find(card => card.id === item.id_card);
            shop.push({
                    id: item.id_card,
                    name: cardName.name,
                    price: item.price
                });
        });
        return shop;
    }
}
module.exports = {
    Shop,
}