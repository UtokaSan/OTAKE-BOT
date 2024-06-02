const {EmbedBuilder, ButtonBuilder, ActionRowBuilder, StringSelectMenuBuilder} = require("discord.js");
const { ChannelType } = require('discord.js');

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
    await thread.send("First player choose a card");
    await createListCard(interaction, player1, thread);
}

async function createListCard(interaction, userId, thread) {
    const embed = new EmbedBuilder()
        .setTitle("List of your cards")
        .setDescription("Select a card to play")
        .setColor("Red");

    const row = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId("select_card")
                .setPlaceholder("Select a card")
                .addOptions([
                    {
                        label: "Card 1",
                        value: "card1"
                    },
                    {
                        label: "Card 2",
                        value: "card2"
                    },
                    {
                        label: "Card 3",
                        value: "card3"
                    }
                ])
        );

    thread.send({ embeds: [embed], components: [row] });
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