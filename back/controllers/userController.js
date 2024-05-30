import {
    createUser,
    deleteUser,
    readUserById,
    readUserByPseudo,
    readUsers,
    updateUser
} from "../services/userService.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()
const maxAge = 7 * 24 * 60 * 60;

const createToken = (id) => { // Not Exported
    return jwt.sign({"id": id}, process.env.HASH, {
        expiresIn: maxAge
    });
}

const getAllUser = async (req, res) => {
    try {
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
    } catch (err) {
        console.log("error with db");
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
    // console.log("role : ", req.body.role)
    // console.log("YES")

    let changeValue = [];

    if (req.body.pseudo) changeValue.push(`pseudo='${req.body.pseudo}'`);
    if (req.body.money) changeValue.push(`money='${req.body.money}'`);
    if (req.body.win) changeValue.push(`win='${req.body.win}'`);
    if (req.body.loose) changeValue.push(`loose='${req.body.loose}'`);
    if (req.body.avatar) changeValue.push(`avatar='${req.body.avatar}'`);
    if (req.body.elo) changeValue.push(`elo='${req.body.elo}'`);
    if (req.body.role) changeValue.push(`role='${req.body.role}'`);

    const paramsToChange = changeValue.join(', ');
    try {
        updateUser(id, paramsToChange).then((rst) => {
            console.log(rst);
            res.status(200).send(rst);
        }).catch((err) => {
            console.error("error executing query:", err);
            res.status(500).send({message: "Internal Server Error"});
        });
    } catch (err) {
        console.log("error with db");
        res.status(500).send({message: "Internal Server Error"});
    }
}

const registerUser = async (req, res) => {
    let userValue = req.body;
    console.log(userValue);

    const salt = await bcrypt.genSalt(10);
    userValue.password = await bcrypt.hash(userValue.password, salt); // Hash this Password
    console.log("password : ", userValue.password)

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
        deleteUser(id).then((rstee) => {
            // console.log(`The User ${user.pseudo} ( ${user.id} ) has been deleted`)
            console.log("rstee : ", rstee)
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

const checkUser = (req, res, next) => {
    const user = req.body;

    // Test if email and password are provided
    if (!user.pseudo || !user.password) {
        res.status(400).send('pseudo and password are required');
        return;
    }

    // Test if email is valid with regex
    // if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    //     res.status(400).send('pseudo is not valid');
    //     return;
    // }

    // Test if password is at least 8 characters
    if (user.password.length < 8) {
        res.status(400).send('password must be at least 8 characters');
        return;
    }

    next();
}

const login = async (req, res) => {
    // before this function is called, the checkUser middleware will have already validated the request body
    const {pseudo, password} = req.body;
    console.log(req.body)
    console.log("testt")

    try {
        const user = await readUserByPseudo(pseudo);
        console.log("user : ", user);
        if (!user) {
            res.status(500).json("incorrect pseudo");
            return
        }
        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            res.status(400).json("incorrect password");
            return
        }

        const token = createToken(user.discord_id);
        res.cookie('jwt', token, {httpOnly: false, maxAge: maxAge * 1000});
        res.status(200).json({token: token});
        return user;
    } catch (err) {
        res.status(400).json(err)
    }
}

const isConnect = (req, res) => {
    // const token = req.body.sessionData;
    const tokenCookie = req.cookies.jwt;
    const tokenReq = req.body.jwt;
    console.log(req.cookies);

    const token = tokenCookie ? tokenCookie : tokenReq;

    console.log("tokenReq : ", tokenReq);
    console.log("tokenCookie : ", tokenCookie);

    console.log("token : ", token);

    if (token) {
        jwt.verify(token, process.env.HASH, async (err, decodedToken) => {
            if (err) {
                await console.log(err.message);
                res.status(400).json({isConnected: false});
            } else {
                console.log("user : ", decodedToken);
                const user = await readUserById(decodedToken.id);

                res.status(200).json({isConnected: true, role: user.role});
            }
        })
    } else {
        console.log("Not Connect");
        res.status(500).json({isConnected: false});
    }
}

const requireAuth = (req, res, next) => {
    // const token = req.body.token;
    const cookieToken = req.cookies.jwt;
    const reqToken = req.body.jwt;
    console.log("reqToken : ", req.body);
    console.log("cookieToken : ", cookieToken);
    console.log("reqToken : ", req.body.jwt);

    const token = cookieToken ? cookieToken : reqToken
    console.log(token);


    if (!token) return


    console.log(token ? "token : " + token : "no token");

    if (token) {
        jwt.verify(token, process.env.HASH, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                console.log("redirect to login");
                res.status(500).redirect('/login');
            } else {
                const user = await readUserById(decodedToken.id);
                if (user === undefined) {
                    res.status(404).send({message: "User not found"});
                    return;
                }
                if (!user.role >= 1) {
                    res.status(403).send({message: "You are not allowed to access this resource"});
                    return;
                }

                console.log("user : ", decodedToken);
                next();
            }
        })
    } else {
        console.log("Not Connect ( no token )");
        res.status(302).json({
            message: 'You are being redirected to the login page.',
            redirectUrl: '/login'
        });
    }
}


export {
    getAllUser,
    getOneUserById,
    editUserController,
    registerUser,
    deleteUserById,

    checkUser,
    login,
    isConnect,
    requireAuth
};
