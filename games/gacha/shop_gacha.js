const {pgClient} = require("../../database/database_config");
const {Shop} = require("./class/Shop");
const {User} = require("./class/User");



async function executeShopGacha(interaction) {
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
        case "buy":
            await buyCharacter(interaction);
            break;
        case "sell":
            await sellCharacter(interaction);
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
    await shop.sellCard(user, cardId)
    await shop.showShop();
    await interaction.reply("Card sold successfully");
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
    await shopClass.buyCard(user, cardId);
    await interaction.reply("Card bought successfully");
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