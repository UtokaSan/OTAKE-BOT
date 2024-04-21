const {pgClient} = require("../database_config");


async function addCooldownUserInDb(member, client) {
    try {
        const userId = member.user.id;
        const queryText = 'INSERT INTO cooldown_reward (discord_id, cooldown_quizz, cooldown_cards, cooldown_shop) VALUES ($1, NOW(), NOW(), NOW())';
        const values = [userId];
        await pgClient.query(queryText, values);
    } catch (err) {
        console.log(err);
    }
}

async function addAllCooldownUserInDb(client) {
    const guild = client.guilds.cache.first();

    async function checkAndAddCooldown() {
        try {
            const members = await guild.members.fetch();
            const memberIds = Array.from(members.keys());
            const res = await pgClient.query('SELECT * FROM cooldown_reward WHERE discord_id = ANY($1)', [memberIds]);
            if (res.rows.length === 0) {
                for (const member of members.values()) {
                    if (!member.user.bot) {
                        await addCooldownUserInDb(member, client)
                        console.log('Cooldown added in db');
                    }
                }
            }
        } catch (error) {
            console.error('Error fetching guild members:', error);
        }
    }
    setInterval(checkAndAddCooldown,60 * 1000);
}

module.exports = {
    addCooldownUserInDb,
    addAllCooldownUserInDb,
};