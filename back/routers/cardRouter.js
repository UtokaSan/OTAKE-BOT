import express from 'express';
import {
    createCardController,
    deleteCardController,
    getAllCardOneIdUser,
    getAllCards,
    getOneCard,
    updateCardController
} from "../controllers/cardController.js";
import { requireAuth } from "../controllers/userController.js";

const routerCard = express.Router();

routerCard.get('/', getAllCards);
routerCard.get('/:id', getOneCard);
routerCard.get('/user/:id', getAllCardOneIdUser);
routerCard.post('/', requireAuth, createCardController);
routerCard.patch('/:id', requireAuth, updateCardController);
routerCard.delete('/:id', requireAuth, deleteCardController);

export { routerCard };