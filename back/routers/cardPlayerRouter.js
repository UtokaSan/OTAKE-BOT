import express from 'express';
import {
    addCardToPlayer,
    getAllCardsAndPlayers,
    getCardsByPlayer
} from "../controllers/cardPlayerController.js";

const routerCardPlayer = express.Router();

routerCardPlayer.get('/', getAllCardsAndPlayers);
routerCardPlayer.get('/:id', getCardsByPlayer);
routerCardPlayer.post('/add', addCardToPlayer);
// routerCardPlayer.post('/steal', stealCardFromPlayer);
// routerCardPlayer.post('/exhange', exchangeCardWithPlayer);
//
// routerCardPlayer.delete('/delete', deleteCardFromPlayer);


export { routerCardPlayer };