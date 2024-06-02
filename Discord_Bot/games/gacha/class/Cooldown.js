const {pgClient} = require("../../../database/database_config");

class Cooldown {
    constructor(userId) {
        this._userId = userId;
        this.cooldownEnd = null;
    }

    async setCooldown(type, duration) {
        const now = new Date();
        this.cooldownEnd = new Date(now.getTime() + duration * 1000);
        await pgClient.query(`UPDATE cooldown_reward
                              SET cooldown_${type} = $1
                              WHERE discord_id = $2`, [this.cooldownEnd, this._userId]);
    }

    async differenceTime(type) {
        const now = new Date();
        const res = await pgClient.query(`SELECT cooldown_${type}
                                          FROM cooldown_reward
                                          WHERE discord_id = $1`, [this._userId]);
        this.cooldownEnd = res.rows[0][`cooldown_${type}`];
        return {
            hours: Math.floor((this.cooldownEnd - now) / (1000 * 60 * 60)),
            minutes: Math.floor((this.cooldownEnd - now) / (1000 * 60)) % 60,
            seconds: Math.floor((this.cooldownEnd - now) / 1000) % 60
        }
    }

    async checkCooldown(type) {
        const now = new Date();

        const res = await pgClient.query(`SELECT cooldown_${type}
                                          FROM cooldown_reward
                                          WHERE discord_id = $1`, [this._userId]);
        this.cooldownEnd = res.rows[0][`cooldown_${type}`];
        if (now > this.cooldownEnd) {
            return false;
        } else {
            return true;
        }
    }
}

module.exports = {
    Cooldown,
}