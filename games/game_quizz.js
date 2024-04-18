// REFAIRE LE CODE
async function gameQuizzCommand(interaction) {
    await interaction.reply("Game quizz started!");
    const randomCharacter = await randomChar.GetChar();
    const nameCharacter = randomCharacter.CharacterName
    await interaction.followUp(`Who is this character? ${randomCharacter.CharacterImage}`);
    await interaction.followUp("indice the character begin with : " + nameCharacter.charAt(0));
    console.log('randomCharacter', nameCharacter)
    const filter = (message) => message.author.id === interaction.user.id;
    const collector = interaction.channel.createMessageCollector({ filter, time: 40000 });
    collector.on('collect', async message => {
        const answer = message.content.toLowerCase();
        verificationAnswer(interaction ,answer, nameCharacter)
        collector.stop();
    });
}

async function verificationAnswer(interaction, input, name) {
    let isCorrect = false;
}

module.exports = {
    gameQuizzCommand,
};