import {
    createCardPlayer,
    readCardsByPlayer,
    readCardsPlayers
} from "../services/cardPlayerService.js";

const getAllCardsAndPlayers = async (req, res) => {
    try {
        const results = await readCardsPlayers();
        console.log('Requête GET reçue');
        res.send(results);
    } catch (err) {
        console.error("error executing query:", err);
        res.status(500).send('Error C : ' + err);
    }
}
const getCardsByPlayer = async (req, res) => {
    const playerId = req.params.id;

    try {
        const results = await readCardsByPlayer(playerId);
        console.log('Requête GET reçue');
        res.send(results);
    } catch (err) {
        console.error("error executing query:", err);
        res.status(500).send('Error C : ' + err);
    }
}

const addCardToPlayer = async (req, res) => {
    const playerId = req.params.idPlayer;
    const cardId = req.body.idCard;

    try {
        const result = await createCardPlayer(playerId, cardId);

        res.status(201).send(result);
    } catch (err) {
        console.error("error executing query:", err);
        res.status(500).send('Error C : ' + err);
    }
}

const stealCardFromPlayer = (req, res) => {
    const playerStolen = req.params.idPlayerStolen;
    const playerStealer = req.body.idPlayerStealer;

    const cardId = req.body.idCard;
}

const exchangeCardWithPlayer = (req, res) => {
    res.send('Get cards by player');
}

const deleteCardFromPlayer = (req, res) => {
    res.send('Get cards by player');
}

export {
    getAllCardsAndPlayers,
    getCardsByPlayer,
    addCardToPlayer,
    stealCardFromPlayer,
    exchangeCardWithPlayer,
    deleteCardFromPlayer
}