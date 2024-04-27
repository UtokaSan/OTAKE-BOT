const {pgClient} = require("../database_config");

async function createCard(owner_id, name, rarity, price, attack, pv, image) {
    const queryText = 'INSERT INTO cards (owner_id, name, rarity, price, attack, pv, image) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    const values = [owner_id, name, rarity, price, attack, pv, image];
    await pgClient.query(queryText, values);
}

async function updateCard(id, owner_id, name, rarity, price, attack, pv, image) {
    const queryText = 'UPDATE cards SET owner_id = $2, name = $3, rarity = $4, price = $5, attack = $6, pv = $7, image = $8 WHERE id = $1';
    const values = [id, owner_id, name, rarity, price, attack, pv, image];
    await pgClient.query(queryText, values);
}

async function deleteCard(id) {
    const queryText = 'DELETE FROM cards WHERE id = $1';
    const values = [id];
    await pgClient.query(queryText, values);
}

module.exports = {
    createCard,
    updateCard,
    deleteCard,
}