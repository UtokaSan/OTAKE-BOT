const pgClient = require("../../database/database_config").pgClient;
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Component} = require('discord.js');
const jikan = require("@mateoaranda/jikanjs");
const {Cooldown} = require("./class/Cooldown");
const {DurationCooldown} = require("../../enums/DurationCooldown");
const {Character} = require("../../enums/Cards");
const {createCard} = require("../../database/controllers/card_controller");
const {executeDuelGacha} = require("./duel_gacha");

function executeGacha(interaction, client) {
  const subcommand = interaction.options.getSubcommand();
  switch (subcommand) {
    case "start":
        startGacha(interaction);
        break;
    case "duel":
        executeDuelGacha(interaction, client);
        break;
  }
}

async function verifyCharacterExistInDb() {
    while (true) {
        let character = await jikan.loadRandom("characters");
        let animeCharacterSearch = await jikan.loadCharacter(character.data.mal_id, 'anime');
        if (animeCharacterSearch.data.length > 0 && character.data.images.jpg.image_url !== "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png") {
            const result = await pgClient.query("SELECT * from cards WHERE name = $1", [character.data.name]);
            if (result.rows.length === 0) {
                return character;
            }
        }
    }
}
async function startGacha(interaction) {
    try {
        const cooldown = new Cooldown(interaction.user.id);
        if (!await cooldown.checkCooldown("cards")) {
            const topCharacters = await topCharactersAnime();
            const character = await verifyCharacterExistInDb();
            const nameCharacter = character.data.name;
            const imageCharacter = character.data.images.jpg.image_url;
            const userId = interaction.user.id;
            let embedCard = new EmbedBuilder();

            if (topCharacters.name === nameCharacter) {
                await interaction.followUp("Congratulations! You got a legendary character!");
                embedCard = createEmbed("Gold", `You got ${nameCharacter}`, imageCharacter, topCharacters.force, topCharacters.life, topCharacters.rarity, topCharacters.sell);
                await createCard(userId, nameCharacter, topCharacters.rarity, topCharacters.price, topCharacters.attack, topCharacters.pv, imageCharacter);
            } else {
                embedCard = createEmbed("Grey", `You got ${nameCharacter}`, imageCharacter, Character.common.attack.toString(), Character.common.pv.toString(), "Common", Character.common.price.toString());
                await createCard(userId, nameCharacter, "Common", Character.common.price, Character.common.attack, Character.common.pv, imageCharacter)
            }
            await interaction.reply({ embeds: [embedCard] });
            await cooldown.setCooldown("cards", DurationCooldown.CARDS);
        } else {
            let time = await cooldown.differenceTime("cards");
            await interaction.reply(`You have to wait ${time.hours} hours, ${time.minutes} minutes, ${time.seconds} secondes to play again`);
        }
    } catch (err) {
        console.error('Error handling interaction:', err);
    }
}

function createEmbed(color, title, image, force, life, rarity, sell) {
    return new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setImage(image)
        .addFields(
            {name: "⚔️Strength", value: force},
            {name: "❤️Life", value: life},
            {name: "💎Rarity", value: rarity},
            {name : "💰Sell", value: sell}
        );
}

async function topCharactersAnime() {
    try {
        const response = await jikan.loadTop('characters');
        return response.data.map((character) => ({
            name: character.name,
            image: character.images.jpg.image_url,
            force: Character.legendary.attack,
            life: Character.legendary.pv,
            sell: Character.legendary.price,
            rarity: "Legendary"
        }));
    } catch (err) {
        console.log(err);
    }
}
module.exports = {
    executeGacha,
}