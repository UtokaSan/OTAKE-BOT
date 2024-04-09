const { SlashCommandBuilder } = require('discord.js');

const pingCommand = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!");
const gameQuizz = new SlashCommandBuilder()
    .setName("game-quizz")
    .setDescription("Start a game quizz");
const gameGacha = new SlashCommandBuilder()
    .setName("game-gacha")
    .setDescription("Start a game gacha")
    .addSubcommand(subcommand =>
        subcommand
            .setName("start")
            .setDescription("Start a game gacha")
    )
    .addSubcommand(subcommand =>
        subcommand
            .setName("stop")
            .setDescription("Stop a game gacha")
    );

module.exports = {
    pingCommand,
    gameQuizz,
    gameGacha,
};