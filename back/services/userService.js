import Database from '../db/db.js';

const readUsers = async () => {
    const client = Database.getInstance().getClient();

    try {
        const results = await client.query(`SELECT * FROM "user" ORDER BY id ASC`);
        console.log('Requête GET reçue');
        console.log(results.rows);
        return results.rows;
    } catch (err) {
        console.error("error executing query:", err);
    }
}

const readUserById = async (id) => {
    const client = Database.getInstance().getClient();
    try {
        const results = await client.query(`SELECT * FROM "user" WHERE id = $1`, [id]);
        return results.rows[0];
    } catch (err) {
        console.error("error executing query:", err);
    }
}

const deleteUser = async (id) => {
    const client = Database.getInstance().getClient();
    // delete user with id
    try {
        const results = await client.query(`DELETE FROM "user" WHERE id = $1`, [id]);
        console.log('The User has been deleted');
        return results.rows;
    } catch (err) {
        console.error("error executing query:", err);
    }
}

const createUser = async (pseudo, argent) => {

    console.log("pseudo, argent")
    console.log(pseudo, argent)

    const client = Database.getInstance().getClient();

    try {
        const queryText = `INSERT INTO "user"(pseudo, argent) VALUES ($1, $2) RETURNING id`;
        const values = [pseudo, argent];
        const results = await client.query(queryText, values);

        return await results.rows[0];
    } catch (err) {
        console.error("error executing query:", err);
        throw err;
    }
}

export { readUsers, readUserById, createUser, deleteUser }