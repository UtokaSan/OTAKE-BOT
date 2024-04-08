import Database from '../db/db.js';

const readUsers = async () => {
    const client = Database.getInstance().getClient();
    try {
        const results = await client.query("SELECT * FROM users ORDER BY id ASC");
        console.log('Requête GET reçue');
        console.log(results.rows);
        return results.rows;
    } catch (err) {
        console.error("error executing query:", err);
    }
}

const isAlreadyRegistered = async (uuid) => {
    const client = Database.getInstance().getClient();
    try {
        const results = await client.query("SELECT * FROM users WHERE uuid = $1", [uuid]);
        console.log('Already registered ?' + results.rows.length > 0);
        console.log(results.rows);
        return results.rows.length > 0;
    } catch (err) {
        console.error("error executing query:", err);
    }
}

const deleteUser = async (id) => {
    const client = Database.getInstance().getClient();
    // delete user with id
    try {
        const results = await client.query("DELETE FROM users WHERE id = $1", [id]);
        console.log('Nice DELETE request !');
        console.log(results.rows);
        return results.rows;
    } catch (err) {
        console.error("error executing query:", err);
    }
}

const createUser = async (uuid, pseudo, argent) => {

    console.log("uuid, pseudo, argent")
    console.log(uuid, pseudo, argent)

    const client = Database.getInstance().getClient();

    try {
        const queryText = "INSERT INTO users (uuid, pseudo, argent) VALUES ($1, $2, $3)";
        const values = [uuid, pseudo, argent];
        const results = await client.query(queryText, values);
        console.log('Nice POST request !');
        console.log(results.rows);
        return results.rows;

    } catch (err) {
        console.error("error executing query:", err);
    }
}

export { readUsers, createUser, isAlreadyRegistered, deleteUser }