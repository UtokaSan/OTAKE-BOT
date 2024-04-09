import { readMoneyById, updateMoneyById } from "../services/moneyService.js";

const getMoneyUser = (req, res) => {
    const id = req.params.id;

    readMoneyById(id).then((user) => {
        if (user === undefined) res.status(404).send({message: "Not user found"})
        res.status(201).send(user);
    }).catch((err) => {
        console.error("error executing query:", err);
        res.status(500).send({message: "Internal Server Error"});
    });
}

const removeMoneyUser = (req, res) => {
    const id = req.params.id;
    const money = req.body.money;

    updateMoneyById(id, -money).then(() => {
        res.status(200).send({message: "Money removed"});
    }).catch((err) => {
        console.error("error executing query:", err);
        res.status(500).send({message: "Internal Server Error"});
    });
}

const addMoneyUser = (req, res) => {
    const id = req.params.id;
    const money = req.body.money;

    updateMoneyById(id, money).then(() => {
        res.status(201).send({message: "Money added"});
    }).catch((err) => {
        console.error("error executing query:", err);
        res.status(500).send({message: "Internal Server Error"});
    });
}

export { getMoneyUser, removeMoneyUser, addMoneyUser };
