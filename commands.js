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
    .addSubcommandGroup(subcommandGroup =>
        subcommandGroup
            .setName("gacha")
            .setDescription("Gacha-related commands")
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
    )
    .addSubcommandGroup(subcommandGroup =>
        subcommandGroup
            .setName("shop")
            .setDescription("Buy and sell characters")
            .addSubcommand(subcommand =>
                subcommand
                    .setName("buy")
                    .setDescription("Buy a character")
                    .addIntegerOption(option =>
                        option
                            .setName("id")
                            .setDescription("The id of the character")
                            .setRequired(true)
                    )
            )
            .addSubcommand(subcommand =>
                subcommand
                    .setName("sell")
                    .setDescription("Sell a character")
                    .addIntegerOption(option =>
                        option
                            .setName("id")
                            .setDescription("The id of the character")
                            .setRequired(true)
                    )
            )
            .addSubcommand(subcommand =>
                subcommand
                    .setName("show")
                    .setDescription("Show the shop")
            )
    );
const dataProfile = new SlashCommandBuilder()
    .setName("profile")
    .setDescription("Display your profile")
    .addSubcommandGroup(subcommandGroup =>
        subcommandGroup
            .setName("info")
            .setDescription("display your profile")
            .addSubcommand(subcommand =>
                subcommand
                    .setName("show-gold")
                    .setDescription("display your gold")
            )
            .addSubcommand(subcommand =>
            subcommand
                .setName("show-cards")
                .setDescription("display your cards")
            )
            .addSubcommand(subcommand =>
            subcommand
                .setName("show-profile")
                .setDescription("display your profile")
            )
    );
module.exports = {
    pingCommand,
    gameQuizz,
    gameGacha,
    dataProfile
};