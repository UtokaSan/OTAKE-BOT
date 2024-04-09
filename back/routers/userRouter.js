import express from 'express';
import {
    deleteUserById,
    getAllUser,
    registerUser,
} from "../controllers/userController.js";

const routerUser = express.Router();

routerUser.get('/', getAllUser);
routerUser.post('/register', registerUser);
routerUser.delete('/:id', deleteUserById);

export { routerUser };