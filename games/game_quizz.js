const jikan = require("@mateoaranda/jikanjs");
const {EmbedBuilder} = require("discord.js");

async function gameQuizzCommand(interaction) {
    await interaction.reply("Game quizz started!");
    let randomCharacter = await randomCharacterAnime();
    let nameCharacter = randomCharacter.data.name;
    image = randomCharacter.data.images.jpg.image_url;
    const message = new EmbedBuilder()
        .setTitle("Who is this character?")
        .setImage(image)
        .setFields({name: "Indice", value: nameCharacter.replace(/[a-z]/g, "_")})
        .setFooter({ text: "You have 40 seconds to answer" });
    await interaction.followUp({ embeds: [message] });
    const filter = (message) => message.author.id === interaction.user.id;
    const collector = interaction.channel.createMessageCollector({ filter, time: 40000 });

    collector.on('collect', async message => {
        const answer = message.content.toLowerCase();
        await verificationAnswer(interaction, answer, nameCharacter);
        collector.stop();
    });
}

async function randomCharacterAnime() {
    while (true) {
        let randomCharacter = await jikan.loadRandom('characters');
        if (randomCharacter.data.favorites > 500) {
            let response = await fetch(`https://api.jikan.moe/v4/characters/${randomCharacter.data.mal_id}/anime`)
            if (!response.ok) {
                console.error(`Failed to load anime characters for ID ${randomCharacter.data.mal_id}: HTTP status ${response.status}`);
                continue;
            }
            let searchCharacterAnime = await response.json();
            if (searchCharacterAnime.data.length > 0 && randomCharacter.data.images.jpg.image_url !== "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png") {
                return randomCharacter;
            }
        }
    }
}

async function verificationAnswer(interaction, input, name) {
    let isCorrect = false;
    if (input === name.toLowerCase()) {
        isCorrect = true;
    }
    if (isCorrect) {
        await interaction.followUp("Congratulations! You have found the right answer!");
    } else {
        await interaction.followUp("Sorry, you didn't find the right answer, the correct answer was: " + name);
    }
}

module.exports = {
    gameQuizzCommand,
};