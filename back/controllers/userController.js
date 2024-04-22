import {
    createUser,
    deleteUser,
    readUserById,
    readUsers,
    updateUser
} from "../services/userService.js";

const getAllUser = async (req, res) => {
    const users = readUsers()
        .then((users) => {
            res.status(200).send(users);
        }).catch((err) => {
            console.error("error executing query:", err);
            res.status(500).send({message: "Internal Server Error"});
        })
    if (users === undefined) {
        res.status(500).send({message: "Internal Server Error"});
    }
}

const getOneUserById = async (req, res) => {
    const id = req.params.id

    const users = readUserById(id)
        .then((users) => {
            res.status(200).send(users);
        }).catch((err) => {
            console.error("error executing query:", err);
            res.status(500).send({message: "Internal Server Error"});
        })
    if (users === undefined) {
        res.status(500).send({message: "Internal Server Error"});
    }
}

const editUserController = async (req, res) => {
    const id = req.params.id;

    console.log("req body : ", req.body)
    console.log("money : ", req.body.money)

    let changeValue = [];
    if (req.body.discord_id) changeValue.push(`discord_id='${req.body.discord_id}'`);
    if (req.body.pseudo) changeValue.push(`pseudo='${req.body.pseudo}'`);
    if (req.body.money) changeValue.push(`money='${req.body.money}'`);
    if (req.body.win) changeValue.push(`win='${req.body.win}'`);
    if (req.body.loose) changeValue.push(`loose='${req.body.loose}'`);
    if (req.body.avatar) changeValue.push(`avatar='${req.body.avatar}'`);
    if (req.body.elo) changeValue.push(`elo='${req.body.elo}'`);
    const paramsToChange = changeValue.join(', ');

    updateUser(id, paramsToChange).then((rst) => {
        console.log(rst);
        res.status(200).send(rst);
    }).catch((err) => {
        console.error("error executing query:", err);
        res.status(500).send({message: "Internal Server Error"});
    });
}

const registerUser = (req, res) => {
    let userValue = req.body;
    console.log(userValue);

    //TODO :: Change Sens of the condition
    createUser(userValue).then((user) => {
        console.log(user);
        res.status(201).send(user);
    }).catch((err) => {
        console.error("error executing query:", err);
        res.status(500).send({message: "Internal Server Error"});
    });
}

const deleteUserById = (req, res) => {
    const id = req.params.id;

    readUserById(id).then((user) => {
        if (user === undefined) res.status(404).send({message: "User not found"});
        deleteUser(id).then(() => {
            console.log(`The User ${user.pseudo} ( ${user.id} ) has been deleted`)
            res.status(200).send(user);
        }).catch((err) => {
            res.status(500).send({message: "The User has not been deleted : " + err});
        });
    }).catch((err) => {
        console.error("error executing query:", err);
        res.status(500).send({message: "Internal Server Error"});
    });
}

// const addMoney = (req,res) => {
//     const id = req.params.id;
//     const argent = req.body.argent;
//
//     readUserById(id).then((user) => {
//         if (user === undefined) res.status(404).send({message: "User not found"});
//         const newArgent = user.argent + argent;
//         updateUser(id, newArgent).then(() => {
//             console.log(`The User ${user.pseudo} ( ${user.id} ) has been updated`)
//             res.status(200).send({argent: newArgent});
//         }).catch((err) => {
//             res.status(500).send({message: "The User has not been updated : " + err});
//         });
//     }).catch((err) => {
//         console.error("error executing query:", err);
//         res.status(500).send({message: "Internal Server Error"});
//     });
// }

export {
    getAllUser,
    getOneUserById,
    editUserController,
    registerUser,
    deleteUserById
};
