import Database from '../db/db.js';

const readUsers = async () => {
    const client = Database.getInstance().getClient();

    try {
        const results = await client.query(`SELECT * FROM "users" ORDER BY pseudo ASC`);
        console.log('Requête GET reçue');
        console.log(results.rows);
        return results.rows;
    } catch (err) {
        console.error("error executing query:", err);
    }
}

const readUserById = async (discord_id) => {
    const client = Database.getInstance().getClient();
    try {
        const results = await client.query(`SELECT * FROM "users" WHERE discord_id = $1`, [discord_id]);
        return results.rows[0];
    } catch (err) {
        console.error("error executing query:", err);
    }
}

const readUserByPseudo = async (name) => {
    const client = Database.getInstance().getClient();
    try {
        const results = await client.query(`SELECT * FROM "users" WHERE pseudo = $1`, [name]);
        return results.rows[0];
    } catch (err) {
        console.error("error executing query:", err);
    }
}

const updateUser = async (discord_id, params) => {
    const client = Database.getInstance().getClient();

    console.log("discord_id", discord_id)
    console.log("params", params)

    try {
        const query = `UPDATE "users" SET ${params} WHERE discord_id = CAST($1 AS VARCHAR) RETURNING *`;
        const rst = await client.query(query, [discord_id]);
        return rst.rows[0];
    } catch (err) {
        console.error("error executing query:", err);
    }
}

const deleteUser = async (id) => {
    const client = Database.getInstance().getClient();
    try {
        const results = await client.query(`DELETE FROM "users" WHERE discord_id = $1 RETURNING *`, [id]);
        console.log('The User has been deleted');
        if (results.rows.length === 0) {
            return undefined;
        }
        return results.rows;
    } catch (err) {
        console.error("error executing query:", err);
    }
}

const createUser = async (user) => {

    console.log("pseudo, argent")
    console.log(user.discord_id, user.pseudo, user.money)

    const client = Database.getInstance().getClient();

    try {
        const queryText = `INSERT INTO "users"(discord_id, pseudo, money,password,avatar) VALUES ($1, $2, $3,$4,$5) RETURNING *`;
        const values = [user.discord_id, user.pseudo, user.money, user.password, user.avatar];
        const results = await client.query(queryText, values);

        return await results.rows[0];
    } catch (err) {
        console.error("error executing query:", err);
        throw err;
    }
}

export {
    readUsers,
    readUserById,
    readUserByPseudo,
    updateUser,
    createUser,
    deleteUser
}