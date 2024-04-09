const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const { pingCommand, gameQuizz, gameGacha } = require('./bot.js');
const randomChar = require('anime-character-random');
const { gameQuizzCommand } = require('./games/game_quizz.js');
const { executeGacha } = require('./games/game_gacha.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent ] });

client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    client.application.commands.create(pingCommand.toJSON());
    client.application.commands.create(gameQuizz.toJSON());
    client.application.commands.create(gameGacha.toJSON());
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
            await executeGacha(interaction);
            break;
    }
});

// Log in to Discord with your client's token
client.login(token);