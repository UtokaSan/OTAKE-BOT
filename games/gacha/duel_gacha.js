const {EmbedBuilder, ButtonBuilder, ActionRowBuilder, StringSelectMenuBuilder, ModalBuilder, TextInputBuilder} = require("discord.js");
const { ChannelType } = require('discord.js');
const {pgClient} = require("../../database/database_config");
const { Card } = require('./class/Card.js');
const { DuelGame } = require('./class/DuelGame.js');

async function executeDuelGacha(interaction, client) {
    try {
        const opponent = interaction.options.getUser("opponent");
        const userId = interaction.user.id;
        const firstUser = await client.users.fetch(userId);
        const firstUserPseudo = firstUser.username;
        const firstUserAvatar = firstUser.displayAvatarURL({size: 256});
        const opponentUser = await client.users.fetch(opponent.id);
        const opponentUserPseudo = opponentUser.username;
        const opponentUserAvatar = opponentUser.displayAvatarURL({size: 256});
        const guild = client.guilds.cache.first();
        const member = await guild.members.fetch(opponent.id);
        let memberduel = [];
        const existingDuel = memberduel.find((element) => (element.player1 === userId && element.player2 === opponent.id) || (element.player1 === opponent.id && element.player2 === userId));
        if (existingDuel) {
            await interaction.reply("You already have a duel with this user");
            return;
        }
        if (userId === opponent.id) {
            await interaction.reply("You can't duel yourself");
            return;
        }
        if (member.user.bot) {
            await interaction.reply("You can't duel a bot");
            return;
        }
        if (member.presence?.status === "online" || member.presence?.status === "idle" || member.presence?.status === "dnd") {
            memberduel.push({
                player1: interaction.user.id,
                player2: opponent.id
            })
            await createEmbedDuel(interaction, firstUserAvatar, opponentUserAvatar, opponentUserAvatar, opponentUserPseudo);
            const filter = (interaction) => {
                return interaction.user.id === opponent.id;
            }
            const collector = interaction.channel.createMessageComponentCollector({filter, time: 60000});
            collector.on('collect', async (interaction) => {
                if (interaction.customId === "accept_duel") {
                        await interaction.reply(`${opponent.username} accepted the duel`);
                        await acceptDuel(opponent, interaction, userId);
                        collector.stop();
                } else if (interaction.customId === "decline_duel") {
                        await interaction.reply(`${opponent.username} decline the duel`);
                        collector.stop();
                }
            });
        } else {
            await interaction.reply(`${opponent.username} is not connected`);
        }
    } catch (err) {
        console.error('Error handling interaction:', err);
    }
}

async function acceptDuel(opponent,interaction, player1) {
    const thread = await createThread(interaction, opponent, player1);
    await thread.send(`Welcome to the duel between <@${player1}> and <@${opponent.id}>!`);
    await duel(interaction, thread, player1, opponent.id);
}

async function createListCard(interaction, userId, thread, player, gameEnded) {

    console.log("Function work");
    const user = await interaction.client.users.fetch(userId);
    const filter = m => m.author.id === user.id;
    let validCard = false;

    while (!validCard && !gameEnded) {
        const collector = thread.createMessageCollector({ filter, max: 1, time: 30000 });

        const collected = await new Promise((resolve) => {
            collector.on('end', (collected) => resolve(collected));
        });

        if (collected.size === 0) {
            await thread.send(`${player} did not choose a card in time !`);
            return;
        } else {
            const cardChoice = collected.first().content;
            console.log(cardChoice);
            const cardsDB = await pgClient.query("SELECT * from cards WHERE id = $1", [cardChoice]);
            if (cardsDB.rows.length > 0) {
                const card = cardsDB.rows[0];
                console.log(card.owner_id, userId)
                if(card.owner_id === userId) {
                    await thread.send(`${player} has chosen the card : ${cardChoice}`);
                    validCard = true;
                    return cardsDB;
                } else {
                    await thread.send(`${player} did not choose a card that belongs to them !`);
                }
            } else {
                await thread.send(`La carte "${cardChoice}" does not exist. Please choose another card.`);
            }
        }
    }
}

async function duel(interaction, thread, player1, player2) {
    let gameEnded = false;
    thread.send("first player must choose a card");
    const player1CardData = await createListCard(interaction, player1, thread, "player1", gameEnded);
    thread.send("opponent must choose a card");
    const player2CardData = await createListCard(interaction, player2, thread, "player2", gameEnded);
    if (!player1CardData || !player2CardData) {
        return;
    }
    const card1 = new Card(player1CardData.rows[0].name, player1CardData.rows[0].attack, player1CardData.rows[0].defense, player1CardData.rows[0].pv, 0.8);
    const card2 = new Card(player2CardData.rows[0].name, player2CardData.rows[0].attack, player2CardData.rows[0].defense, player2CardData.rows[0].pv, 0.8);
    const game = new DuelGame(card1, card2);
    game.play(thread, (isGameEnded) => {
        gameEnded = isGameEnded;
    });
}

async function createThread(interaction, opponent, player1) {
    const thread = await interaction.channel.threads.create({
        name: `Duel with ${opponent.username}`,
        autoArchiveDuration: 60,
        type: ChannelType.PrivateThread
    });
    await thread.members.add(player1);
    await thread.members.add(opponent.id);
    return thread;
}

async function createEmbedDuel(interaction, firstUserAvatar, opponentUserAvatar, opponentUserAvatar, opponentUserPseudo) {
    const embeds = [
        new EmbedBuilder()
            .setURL("https://example.org/")
            .setImage(firstUserAvatar)
            .setTitle("Duel with " + opponentUserPseudo)
            .setColor("Red"),
        new EmbedBuilder()
            .setURL("https://example.org/")
            .setImage(opponentUserAvatar)
    ];
    const acceptButton = new ButtonBuilder()
        .setCustomId("accept_duel")
        .setLabel("Accept Duel")
        .setStyle("Primary")
        .setEmoji("✅")
        .setDisabled(false);
    const declineButton = new ButtonBuilder()
        .setCustomId("decline_duel")
        .setLabel("Decline Duel")
        .setStyle("Secondary")
        .setEmoji("❌")
        .setDisabled(false);
    const actionRow = new ActionRowBuilder().addComponents(acceptButton, declineButton);
    await interaction.reply({embeds: embeds, components: [actionRow]});
}

module.exports = {
    executeDuelGacha
}