const {pgClient} = require("./database_config");


// Faire un update de la table users pour ajouter un utilisateur
// Si l'utilisateur n'existe pas dans la table, on l'ajoute
async function addUserInDb(member, client) {
    try {
        const userId = member.user.id;
        const user = await client.users.fetch(userId);
        const pseudo = user.username;
        const queryText = 'INSERT INTO users (discord_id, money, pseudo, elo) VALUES ($1, $2, $3, $4)';
        const values = [userId, 0, pseudo, 0];
        await pgClient.query(queryText, values);
    } catch (err) {
        console.log(err);
    }
}

async function addAllUserInDb(client) {
    const guild = client.guilds.cache.first();
    try {
        const members = await guild.members.fetch();
        const memberIds = Array.from(members.keys());
        const res = await pgClient.query('SELECT * FROM users WHERE discord_id = ANY($1)', [memberIds]);
        if (res.rows.length === 0) {
            for (const member of members.values()) {
                if (!member.user.bot) {
                    await addUserInDb(member, client)
                    console.log('User added in db');
                }
            }
        }
    } catch (error) {
        console.error('Error fetching guild members:', error);
    }
}

module.exports = {
    addUserInDb,
    addAllUserInDb,
};