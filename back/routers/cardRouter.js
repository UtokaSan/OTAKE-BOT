import express from 'express';
import {
    createCardController,
    deleteCardController,
    getAllCardOneIdUser,
    getAllCards,
    getOneCard,
    updateCardController
} from "../controllers/cardController.js";

const routerCard = express.Router();

routerCard.get('/', getAllCards);
routerCard.get('/:id', getOneCard);
routerCard.get('/user/:id', getAllCardOneIdUser);
routerCard.post('/', createCardController);
routerCard.patch('/:id', updateCardController);
routerCard.delete('/:id', deleteCardController);

export { routerCard };