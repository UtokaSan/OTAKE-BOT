import Database from "../db/db.js";

const readAllCard = async () => {
    const client = Database.getInstance().getClient();

    try {
        const results = await client.query(`SELECT * FROM "cards" ORDER BY id ASC`);
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
        const results = await client.query(`SELECT * FROM "cards" WHERE id = ${id}`);
        console.log('Requête GET reçue');
        console.log(results.rows);
        return results.rows;
    } catch (err) {
        console.error("error executing query:", err);
    }
}

const readCardByIdUser = async (id) => {
    const client = Database.getInstance().getClient();

    console.log("id readCardByIdUser : ", id, typeof id)
    try {
        const results = await client.query(`SELECT * FROM "cards" WHERE owner_id = CAST($1 AS VARCHAR);`, [id]);
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
        const result = await client.query(`INSERT INTO "cards" (name, attack, pv, price, rarity, image) VALUES ('${card.name}', '${card.attack}', '${card.pv}','${card.price}', '${card.rarity}', '${card.image}') RETURNING *`);
        return result.rows[0];
    } catch (err) {
        console.error("error executing query:", err);
    }
}

const updateCard = async (id, params) => {
    const client = Database.getInstance().getClient();
    console.log("Update");

    try {
        const query = `UPDATE "cards" SET ${params} WHERE id = ${id} RETURNING *`;
        const rst = await client.query(query);
        console.log('Requête PATCH reçue');
        console.log(rst[0]);
        return rst.rows[0];
    } catch (err) {
        console.error("error executing query:", err);
    }
}

const removeCard = async (id) => {
    const client = Database.getInstance().getClient();
    try {
        const rst = await client.query(`DELETE FROM "cards" WHERE id = ${id} RETURNING *`);
        if (rst === undefined) return
        console.log('Requête DELETE reçue');
        return rst.rows[0]
    } catch (err) {
        console.error("error executing query:", err);
    }
}

export {
    readAllCard,
    readCardById,
    readCardByIdUser,
    createCard,
    updateCard,
    removeCard
};