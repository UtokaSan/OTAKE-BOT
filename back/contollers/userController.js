    import {
        createUser, deleteUser, readUserById,
        readUsers
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

    const registerUser = (req,res) => {
        const pseudo = req.body.pseudo;
        const argent = req.body.argent;

        createUser(pseudo, argent).then(({id}) => {
            readUserById(id).then((user) => {
                res.status(201).send(user);
            }).catch((err) => {
                console.error("error executing query:", err);
                res.status(500).send({message: "Internal Server Error"});
            });
        }).catch((err) => {
            console.error("error executing query:", err);
            res.status(500).send({message: "Internal Server Error"});
        });
    }

    const deleteUserById = (req,res) => {
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

    export { getAllUser, registerUser, deleteUserById };
