const pgClient = require("../../database/database_config").pgClient;
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Component} = require('discord.js');
const jikan = require("@mateoaranda/jikanjs");
const Character = {
    common : {
        attack: Math.floor(Math.random() * (14 - 1) + 1),
        pv: Math.floor(Math.random() * (14 - 1) + 1),
        price: Math.floor(Math.random() * (80 - 40) + 40)
    },
    legendary : {
        attack: Math.floor(Math.random() * (20 - 14) + 14),
        pv: Math.floor(Math.random() * (20 - 14) + 14),
        price: Math.floor(Math.random() * (1000 - 800) + 800)
    }
}

function executeGacha(interaction) {
  const subcommand = interaction.options.getSubcommand();
  switch (subcommand) {
    case "start":
        startGacha(interaction);
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
        const topCharacters = await topCharactersAnime();
        const character = await verifyCharacterExistInDb();
        const nameCharacter = character.data.name;
        const imageCharacter = character.data.images.jpg.image_url;
        const userId = interaction.user.id;
        let embedCard = new EmbedBuilder();

        if (topCharacters.name === nameCharacter) {
            await interaction.followUp("Congratulations! You got a legendary character!");
            await pgClient.query("INSERT INTO cards (name, attack, pv, price, rarity, owner_id, image) VALUES ($1, $2, $3, $4, $5, $6, $7)", [
                nameCharacter, topCharacters.attack, topCharacters.pv, topCharacters.price, topCharacters.rarity, userId, imageCharacter
            ]);
        } else {
            embedCard = createEmbed("Grey", `You got ${nameCharacter}`, imageCharacter, Character.common.attack.toString(), Character.common.pv.toString(), "Common", Character.common.price.toString());
            await pgClient.query("INSERT INTO cards (name, attack, pv, price, rarity, owner_id, image) VALUES ($1, $2, $3, $4, $5, $6, $7)", [
                nameCharacter, Character.common.attack, Character.common.pv, Character.common.price, "Common", userId, imageCharacter
            ]);
        }
        await interaction.reply({ embeds: [embedCard] });
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