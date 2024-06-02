const {pgClient} = require("../../database/database_config");
const {Shop} = require("./class/Shop");
const {User} = require("./class/User");
const {EmbedBuilder} = require("discord.js");
const {Cooldown} = require("./class/Cooldown");


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
    let user = new User(userId, cards);
    let shop = new Shop();
    if (await shop.sellCard(interaction, user, cardId)){
        interaction.reply("Card sold successfully");
    }
}

async function showShop(interaction) {
    let shop = new Shop();
    let shopList = await shop.showShop();
    let message = new EmbedBuilder;
    if (shopList.length === 0){
        await interaction.reply("The shop is empty");
        return;
    }
    shopList.forEach(item => {
        message.addFields({
            name:`Card ${item.id}`, value:`Name: ${item.name}\nPrice: ${item.price}`
        });
    });
    await interaction.reply({embeds: [message]});

}

async function buyCharacter(interaction) {
    const userId = interaction.user.id;
    const cooldown = new Cooldown(userId);
    if (!await cooldown.checkCooldown("shop")) {
        const cardId = interaction.options.getInteger("id");
        const res = await pgClient.query("SELECT * FROM shop");
        let shop = [];
        res.rows.forEach(item => {
            shop.push({
                id: item.id_card,
                price: item.price
            });
        });
        let user = new User(userId, []);
        console.log(user.money);
        let shopClass = new Shop();
        if (await shopClass.buyCard(interaction, user, cardId)) {
            await interaction.reply("Card bought successfully");
        }
    } else {
        let time = await cooldown.differenceTime("shop");
        await interaction.reply(`You have to wait ${time.hours} hours, ${time.minutes} minutes, ${time.seconds} secondes to play again`);
    }
}

module.exports = {
    executeShopGacha,
}