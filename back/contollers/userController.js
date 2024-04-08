import routerUser from "express";
import {
    createUser, deleteUser,
    isAlreadyRegistered,
    readUsers
} from "../services/userService.js";

const getAllUser = async (req, res) => {
    const users = readUsers().then((users) => {
        res.status(200).send(users);
    }).catch((err) => {
        console.error("error executing query:", err);
        res.status(500).send({message: "Internal Server Error"});
    })
    if (users === undefined) {
        res.status(500).send({message: "Internal Server Error"});
    }
}

const registerUser = (req,res) => {
    console.log(req.body);

    const uuid = req.body.uuid;
    const pseudo = req.body.pseudo;
    const argent = req.body.argent;
    console.log("uuid, pseudo, argent 0");
    console.log(uuid, pseudo, argent);
    let users;

    if (isAlreadyRegistered(uuid)) {
        users = createUser(uuid, pseudo, argent);
    }else {
        console.log("User already registered");
    }
    
    if (users === undefined) {
        res.status(500).send({message: "Internal Server Error"});
    }

    res.status(201).send(users);
}


const deleteUserById = (req,res) => {
    const id = req.params.id;

    console.log("delete id : " + id);

    deleteUser(id).then((user) => {
        res.status(200).send(user);
    }).catch((err) => {
        res.status(500).send({message: "Internal Server Error"});
    });
}

export { getAllUser, registerUser, deleteUserById };
