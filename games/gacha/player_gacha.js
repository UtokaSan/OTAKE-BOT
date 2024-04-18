const jikan = require("@mateoaranda/jikanjs");
const {pgClient} = require("../../database/database_config");
const {Pagination} = require("pagination.djs");
const {EmbedBuilder} = require("discord.js");


async function executeInfoProfile(interaction) {
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
        case "show-cards":
            await showCollection(interaction);
            break;
           case "show-gold":
            await showGold(interaction);
            break;
    }
}

async function showGold(interaction) {
    const userId = interaction.user.id;
    try {
        const res = await pgClient.query("SELECT money FROM users WHERE discord_id = $1", [userId]);
        const money = res.rows[0].money;
        console.log()
        await interaction.reply(`You have ${money} 🪙`);
    } catch (err) {
        console.log(err);
    }
}

async function showCollection(interaction) {
    const userId = interaction.user.id;
    const pagination = new Pagination(interaction);
    try {
        const res = await pgClient.query("SELECT * FROM cards WHERE owner_id = $1", [userId]);
        const embeds = [];
        let currentEmbedIndex = 1;
        for (let i = 0; i < res.rows.length; i += 25) {
            const newEmbed = new EmbedBuilder()
                .setTitle(`Pages ${currentEmbedIndex}`);

            for (let j = i; j < i + 25 && j < res.rows.length; j++) {
                newEmbed.addFields({
                    name:`ID : ${res.rows[j].id}\nRarity : ${res.rows[j].rarity}`,
                    value:`__${res.rows[j].name}__`,
                    inline:true
                });
            }
            embeds.push(newEmbed);
            currentEmbedIndex++;
        }
        pagination.setEmbeds(embeds);
        await pagination.render();
    } catch (err) {
        console.log(err);
    }
}
module.exports = {
    executeInfoProfile,
}