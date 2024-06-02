import express from 'express';
import {
    deleteUserById,
    editUserController,
    getAllUser,
    getOneUserById,
    isConnect,
    login,
    registerUser,
    requireAuth,
} from "../controllers/userController.js";

const routerUser = express.Router();

routerUser.get('/', getAllUser);
routerUser.get('/:id', getOneUserById);
routerUser.patch('/:id', requireAuth, editUserController);
routerUser.post('/register', registerUser);
routerUser.delete('/:id', requireAuth, deleteUserById);

routerUser.post('/login', login);
routerUser.post('/isconnect', isConnect);

export { routerUser };