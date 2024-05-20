import express from 'express';
import {
    addMoneyUser,
    getMoneyUser,
    removeMoneyUser
} from "../controllers/moneyController.js";
import { requireAuth } from "../controllers/userController.js";

const routerMoney = express.Router();

routerMoney.get('/:id', getMoneyUser);
routerMoney.put('/remove/:id', requireAuth, removeMoneyUser);
routerMoney.put('/add/:id', requireAuth, addMoneyUser);

export { routerMoney };