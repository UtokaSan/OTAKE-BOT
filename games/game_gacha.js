const randomChar = require("anime-character-random");

function executeGacha(interaction) {
  const subcommand = interaction.options.getSubcommand();
  switch (subcommand) {
    case "start":
        startGacha(interaction);
        break;
    case "show":
        showCollection(interaction);
        break;
    case "sell":
        sellCharacter(interaction);
        break;
    case "buy":
        buyCharacter(interaction);
        break;
    default:
      interaction.reply("Invalid subcommand");
  }
}

async function startGacha(interaction) {
    const randomCharacter = await randomChar.GetChar();
    const nameCharacter = await randomCharacter.CharacterName
    await interaction.reply(`You got ${nameCharacter}! ${randomCharacter.CharacterImage}`);
}

async function showCollection(interaction) {
    // Show collection
}
async function sellCharacter(interaction) {
    // Sell character
}
async function buyCharacter(interaction) {
    // Buy character
}
module.exports = {
    executeGacha,
}