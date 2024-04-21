import Database from '../db/db.js';

const readMoneyById = async (id) => {
    const client = Database.getInstance().getClient();
    console.log(id);
    try {
        const query = {
            text: 'SELECT * FROM "users" WHERE id = $1',
            values: [id],
        };

        const results = await client.query(query);
        console.log("results", results.rows[0]);
        return await results.rows[0];
    } catch (err) {
        console.error("error executing query:", err);
    }
}

const updateMoneyById = async (id, money) => {
    const client = Database.getInstance().getClient();
    try {
        const query = {
            text: 'UPDATE "users" SET argent = argent + $1 WHERE id = $2 RETURNING *',
            values: [money, id],
        };
        const results = await client.query(query);
        return await results.rows[0];
    } catch (err) {
        console.error("error executing query:", err);
    }
}

export { readMoneyById, updateMoneyById }