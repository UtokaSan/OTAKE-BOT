const {pgClient} = require("../database_config");

async function createUser (discord_id, money, pseudo, elo) {
    const queryText = 'INSERT INTO users (discord_id, money, pseudo, elo) VALUES ($1, $2, $3, $4)';
    const values = [discord_id, money, pseudo, elo];
    await pgClient.query(queryText, values);
}

async function updateUser(discord_id, money, pseudo, elo, win, loose, cooldownReward) {
    const queryText = 'UPDATE users SET money = $1, pseudo = $2, elo = $3, win = $4, loose = $5, cooldownreward = $6 WHERE discord_id = $4';
    const values = [money, pseudo, elo, win, loose, cooldownReward, discord_id];
    await pgClient.query(queryText, values);
}

async function deleteUser(discord_id) {
    const queryText = 'DELETE FROM users WHERE discord_id = $1';
    const values = [discord_id];
    await pgClient.query(queryText, values);
}


module.exports = {
    createUser,
    updateUser,
    deleteUser
};