const {pgClient} = require("../../database/database_config");
const {Shop} = require("./class/Shop");
const {User} = require("./class/User");
const {EmbedBuilder} = require("discord.js");


async function executeShopGacha(interaction) {
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
        case "buy":
            await buyCharacter(interaction);
            break;
        case "sell":
            await sellCharacter(interaction);
            break;
        case "show":
            await showShop(interaction);
            break;
    }
}

async function sellCharacter(interaction) {
    const userId = interaction.user.id;
    const cardId = interaction.options.getInteger("id");
    const res = await pgClient.query("SELECT * FROM cards WHERE owner_id = $1", [userId]);
    let cards = [];
    res.rows.forEach(card => {
        cards.push({
            name: card.name,
            price: card.price
        });
    });
    const gold = await takeGold(userId)
    let user = new User(userId, gold , cards);
    let shop = new Shop();
    if (await shop.sellCard(user, cardId)){
        interaction.reply("You don't have enough money to buy this card");
    }
}
async function showShop(interaction) {
    let shop = new Shop();
    let shopList = await shop.showShop();
    let message = new EmbedBuilder;
    shopList.forEach(item => {
        message.addFields({
            name:`Card ${item.id}`, value:`Name: ${item.name}\nPrice: ${item.price}`
        });
    });
    await interaction.reply({embeds: [message]});

}

async function buyCharacter(interaction) {
    const userId = interaction.user.id;
    const cardId = interaction.options.getInteger("id");
    const res = await pgClient.query("SELECT * FROM shop");
    let shop = [];
    res.rows.forEach(item => {
        shop.push({
            id: item.id_card,
            price: item.price
        });
    });
    const gold = await takeGold(userId)
    let user = new User(userId, gold, []);
    let shopClass = new Shop();
    if (await shopClass.buyCard(interaction, user, cardId)) {
        await interaction.reply("Card bought successfully");
    }
}

async function takeGold(userId) {
try {
        const res = await pgClient.query("SELECT money FROM users WHERE discord_id = $1", [userId]);
        const money = res.rows[0].money;
        return money;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    executeShopGacha,
}