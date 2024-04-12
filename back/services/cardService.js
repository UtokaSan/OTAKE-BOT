import Database from "../db/db.js";

const readAllCard = async () => {
    const client = Database.getInstance().getClient();

    try {
        const results = await client.query(`SELECT * FROM "card" ORDER BY id ASC`);
        console.log('Requête GET reçue');
        console.log(results.rows);
        return results.rows;
    } catch (err) {
        console.error("error executing query:", err);
    }
}

const readCardById = async (id) => {
    const client = Database.getInstance().getClient();

    try {
        const results = await client.query(`SELECT * FROM "card" WHERE id = ${id}`);
        console.log('Requête GET reçue');
        console.log(results.rows);
        return results.rows;
    } catch (err) {
        console.error("error executing query:", err);
    }
}

const createCard = async (card) => {
    const client = Database.getInstance().getClient();

    try {
        await client.query(`INSERT INTO "card" (name, attack, pv, rarity) VALUES ('${card.name}', '${card.attack}', '${card.pv}', '${card.rarity}')`);
        console.log('Requête POST reçue');
    } catch (err) {
        console.error("error executing query:", err);
    }
}

const updateCard = async (id, params) => {
    const client = Database.getInstance().getClient();

    try {
        const query = `UPDATE "card" SET ${params} WHERE id = ${id}`;
        await client.query(query);
        console.log('Requête PATCH reçue');
    } catch (err) {
        console.error("error executing query:", err);
    }
}

const removeCard = async (id) => {
    const client = Database.getInstance().getClient();
    try {
        await client.query(`DELETE FROM "card" WHERE id = ${id}`);
        console.log('Requête DELETE reçue');
    } catch (err) {
        console.error("error executing query:", err);
    }
}

export {
    readAllCard,
    readCardById,
    createCard,
    updateCard,
    removeCard
};