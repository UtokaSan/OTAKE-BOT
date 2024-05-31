const {pgClient} = require("../database_config");
const {addCooldownUserInDb, addAllCooldownUserInDb} = require("./cooldown_model");


async function addUserInDb(member, client) {
    try {
        const userId = member.user.id;
        console.log("id: " + userId);
        const user = await client.users.fetch(userId);
        const pseudo = user.username;
        console.log(user.username)
        const avatar = user.displayAvatarURL();
        const queryText = 'INSERT INTO users (discord_id, avatar, money, pseudo, elo) VALUES ($1, $2, $3, $4, $5)';
        const values = [userId, avatar, 0, pseudo, 0];
        await pgClient.query(queryText, values);
        await addCooldownUserInDb(member);
    } catch (err) {
        console.log(err);
    }
}


async function addAllUserInDb(client) {
    const guild = client.guilds.cache.first();

    async function checkAndAddUsers() {
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
            await addAllCooldownUserInDb(client);
            console.log('Cooldown added in db')
        } catch (error) {
            console.error('Error fetching guild members:', error);
        }
    }
    setInterval(checkAndAddUsers,60 * 1000);
}

module.exports = {
    addUserInDb,
    addAllUserInDb,
};