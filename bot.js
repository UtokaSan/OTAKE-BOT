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
            .setName("duel")
            .setDescription("Start a duel game gacha")
            .addUserOption(option =>
                option
                    .setName("opponent")
                    .setDescription("The user to duel")
                    .setRequired(true)
            )
    )
    .addSubcommand(subcommand =>
        subcommand
            .setName("show")
            .setDescription("show your collection")
    )
    .addSubcommand(subcommand =>
        subcommand
            .setName("sell")
            .setDescription("sell your character")
            .addStringOption(option =>
                option
                    .setName("character")
                    .setDescription("The character to sell")
                    .setRequired(true)
            )
    )
    .addSubcommand(subcommand =>
        subcommand
            .setName("buy")
            .setDescription("buy a character")
            .addStringOption(option =>
                option
                    .setName("character")
                    .setDescription("The character to buy")
                    .setRequired(true)
            )
    );
module.exports = {
    pingCommand,
    gameQuizz,
    gameGacha,
};