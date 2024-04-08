import express from 'express';
import {
    deleteUserById,
    getAllUser,
    registerUser,
} from "../contollers/userController.js";

const routerUser = express.Router();

routerUser.get('/', getAllUser);
routerUser.post('/register', registerUser);
routerUser.delete('/:id', deleteUserById);

export { routerUser };