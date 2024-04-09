import express from 'express';
import {
    addMoneyUser,
    getMoneyUser,
    removeMoneyUser
} from "../controllers/moneyController.js";

const routerMoney = express.Router();

routerMoney.get('/:id', getMoneyUser);
routerMoney.put('/remove/:id', removeMoneyUser);
routerMoney.put('/add/:id', addMoneyUser);

export { routerMoney };