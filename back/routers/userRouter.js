import express from 'express';
import {
    deleteUserById,
    editUserController,
    getAllUser,
    getOneUserById,
    registerUser,
} from "../controllers/userController.js";

const routerUser = express.Router();

routerUser.get('/', getAllUser);
routerUser.get('/:id', getOneUserById);
routerUser.patch('/:id', editUserController);
routerUser.post('/register', registerUser);
routerUser.delete('/:id', deleteUserById);

export { routerUser };