const jikan = require("@mateoaranda/jikanjs");
const {EmbedBuilder} = require("discord.js");
const {User} = require("./gacha/class/User");
const {Cooldown} = require("./gacha/class/Cooldown");
const {DurationCooldown} = require("../enums/DurationCooldown");
async function gameQuizzCommand(interaction) {
    let user = new User(interaction.user.id);
    let cooldown = new Cooldown(interaction.user.id);
    if (!await cooldown.checkCooldown("quizz")) {
        await interaction.reply("Game quizz started!");
        let randomCharacter = await randomCharacterAnime();
        let nameCharacter = randomCharacter.data.name;
        if (nameCharacter.includes("(")) {
            nameCharacter.replace(/\([^)]*\)/g, '')
        }
        image = randomCharacter.data.images.jpg.image_url;
        const message = new EmbedBuilder()
            .setTitle("Who is this character?")
            .setImage(image)
            .setFields({name: "Indice", value: nameCharacter.replace(/[a-z]/g, "_")})
            .setFooter({ text: "You have 40 seconds to answer" });
        await interaction.followUp({ embeds: [message] });
        const filter = (message) => message.author.id === interaction.user.id;
        const collector = interaction.channel.createMessageCollector({ filter, time: 40000 });
        console.log(nameCharacter)
        collector.on('collect', async message => {
            const answer = message.content.toLowerCase();
            if (await verificationAnswer(interaction, answer, nameCharacter)) {
                user._money += 100;
                await user.updateMoney()
            }
            await cooldown.setCooldown("quizz", DurationCooldown.QUIZZ);
            collector.stop();
        });
    } else {
        let time = await cooldown.differenceTime("quizz");
        await interaction.reply(`You have to wait ${time.hours} hours, ${time.minutes} minutes, ${time.seconds} secondes to play again`);
    }
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

// Verification of the answer
// If the answer is correct, the user wins 100 🪙
async function verificationAnswer(interaction, input, name) {
    let isCorrect = false;
    if (input === name.toLowerCase()) {
        isCorrect = true;
    }
    if (isCorrect) {
        await interaction.followUp("Congratulations! You have found the right answer!\nYou won 100 🪙");
        return true;
    } else {
        await interaction.followUp("Sorry, you didn't find the right answer, the correct answer was: " + name);
        return false;
    }
}

module.exports = {
    gameQuizzCommand,
};