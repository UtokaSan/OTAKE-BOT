import {
    createCard,
    readAllCard,
    readCardById,
    readCardByIdUser,
    removeCard,
    updateCard
} from "../services/cardService.js";

const getAllCards = (req, res) => {
    readAllCard().then((cards) => {
        if (cards === undefined) res.status(404).send({message: "Not in Database"})
        res.status(200).send(cards);
    }).catch((err) => {
        console.error("error executing query:", err);
        res.status(500).send({message: "Internal Server Error"});
    });
}

const getOneCard = (req, res) => {
    const id = req.params.id;

    readCardById(id).then((card) => {
        if (card === undefined) res.status(404).send({message: "Not User found"});
        res.status(200).send(card);
    }).catch((err) => {
        console.error("error executing query:", err);
        res.status(500).send({message: "Internal Server Error"});
    });
}

const getAllCardOneIdUser = (req, res) => {
    const id = req.params.id;

    console.log(id)

    readCardByIdUser(id.toString()).then((card) => {
        if (card === undefined) res.status(404).send({message: "Not User found"});
        res.status(200).send(card);
    }).catch((err) => {
        console.error("error executing query:", err);
        res.status(500).send({message: "Internal Server Error"});
    });
}

const createCardController = (req, res) => {
    const {card} = req.body;

    console.log(card)
    console.log(req.body);
    console.log(req.body.name);
    if (req.body.name === undefined) {
        res.status(400).send({message: "Missing fields"});
        return;
    }

    createCard(req.body).then((rst) => {
        console.log("rst :: ", rst)
        if (rst === {} || rst === undefined) {
            res.status(500).send({message: "Error when put data in db"})
            return;
        }
        res.status(201).json(rst);

    }).catch((err) => {
        console.error("error executing query:", err);
        res.status(500).send({message: "Internal Server Error"});
    });
}

const updateCardController = (req, res) => {
    const id = req.params.id;
    console.log("card : ", req.body);
    
    if (req.body === undefined) {
        res.status(400).send({message: "Missing fields"});
        return;
    }

    let changeValue = [];

    if (req.body.name) changeValue.push(`name='${req.body.name}'`);
    if (req.body.attack) changeValue.push(`attack='${req.body.attack}'`);
    if (req.body.pv) changeValue.push(`pv='${req.body.pv}'`);
    if (req.body.price) changeValue.push(`price='${req.body.price}'`);
    if (req.body.rarity) changeValue.push(`rarity='${req.body.rarity}'`);

    if (req.body.owner_id === -1) changeValue.push(`owner_id=null`);
    else if (req.body.owner_id) changeValue.push(`owner_id='${req.body.owner_id}'`);

    console.log("changeValue : ", changeValue);
    if (changeValue.length === 0) {
        res.status(400).send({message: "Missing fields"});
        return;
    }

    updateCard(id, changeValue).then((rst) => {
        res.status(200).send(rst);
    }).catch((err) => {
        console.error("error executing query:", err);
        res.status(500).send({message: "Internal Server Error"});
    });
}

const deleteCardController = (req, res) => {
    const id = req.params.id;

    removeCard(id).then((rst) => {
        if (rst === undefined) {
            res.status(400).send({message: "The card cannot be deleted"});
            return
        }
        console.log(rst)
        res.status(200).send({message: "Card deleted"});
    }).catch((err) => {
        console.error("error executing query:", err);
        res.status(500).send({message: "Internal Server Error"});
    });

}

export {
    getAllCards,
    getOneCard,
    getAllCardOneIdUser,
    createCardController,
    updateCardController,
    deleteCardController
};