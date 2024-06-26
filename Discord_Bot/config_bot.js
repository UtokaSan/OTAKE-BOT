const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const { pingCommand, gameQuizz, gameGacha } = require('./commands.js');
const { gameQuizzCommand } = require('./games/game_quizz.js');
const { executeGacha } = require('./games/gacha/game_gacha.js');
const {addUserInDb, addAllUserInDb} = require("./database/models/user_model");
const {dataProfile} = require("./commands");
const {executeInfoProfile} = require("./games/gacha/player_gacha");
const {executeShopGacha} = require("./games/gacha/shop_gacha");
const {addAllCooldownUserInDb, addCooldownUserInDb} = require("./database/models/cooldown_model");

const client = new Client({ intents: [
    GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences
]});

client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    client.application.commands.create(pingCommand.toJSON());
    client.application.commands.create(gameQuizz.toJSON());
    client.application.commands.create(gameGacha.toJSON());
    client.application.commands.create(dataProfile.toJSON());
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const { commandName } = interaction;
    switch (commandName) {
        case pingCommand.name:
            await interaction.reply("Pong!");
            break;
        case gameQuizz.name:
            await gameQuizzCommand(interaction);
            break;
        case gameGacha.name:
            await executeGacha(interaction, client);
            await executeShopGacha(interaction);
            break;
        case dataProfile.name:
            await executeInfoProfile(interaction);
            break;
    }
});
client.on('ready', async (client) => {
    await addAllUserInDb(client);
    await addAllCooldownUserInDb(client);
});

client.on('guildMemberAdd', async (member) => {
    await addUserInDb(member, client);
    await addCooldownUserInDb(member);
})

client.login(token);