const {pgClient} = require("../database_config");


async function createItemShop(idCard, price) {
    try {
        const queryText = 'INSERT INTO shop (id_card, price) VALUES ($1, $2)';
        const values = [idCard, price];
        await pgClient.query(queryText, values);
    } catch (err) {
        console.log(err);
    }
}

async function updateItemShop(idCard, price) {
    const queryText = 'UPDATE shop SET price = $2 WHERE id_card = $1';
    const values = [idCard, price];
    await pgClient.query(queryText, values);
}

async function deleteItemShop(idCard) {
    const queryText = 'DELETE FROM shop WHERE id_card = $1';
    const values = [idCard];
    await pgClient.query(queryText, values);
}

module.exports = {
    createItemShop,
    updateItemShop,
    deleteItemShop,
}