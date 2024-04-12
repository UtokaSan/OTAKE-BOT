import { readMoneyById, updateMoneyById } from "../services/moneyService.js";
import { createUser, deleteUser, readUsers } from "../services/userService.js";

const commandManagement = (command, ws, message) => {
    console.log('WebSocket client connected');
    switch (command) {
        case 'ping':
            ws.send("pong");
            break;
        case 'getUsers':
            getAllUsersWS(ws);
            break;
        case 'createUser':
            createUserWS(ws, message);
            break;
        case 'deleteUser':
            deleteUserWS(ws, message);
            break;
        case 'deleteUser':
            deleteUserWS(ws, message);
            break;
        case 'getMoney':
            getUserMoney(ws, message);
            break;
        case 'addMoney':
            addUserMoney(ws, message);
            break;
        case 'removeMoney':
            removeUserMoney(ws, message);
            break;
        case 'banana':
            ws.send(' breed !');
            break;
        default:
            ws.send('Command not found');
    }
}

const getAllUsersWS = (ws) => {
    readUsers().then(rst => {
        if (rst === undefined) {
            ws.send('User not created');
            return;
        }
        ws.send(JSON.stringify(rst));
    }).catch((err) => {
        console.error("error executing query:", err);
        ws.send('Error : ' + err);
    });
}

const createUserWS = (ws, message) => {
    const pseudo = message.content.pseudo
    const money = message.content.money

    console.log("Pseudo : ", pseudo, " Money : ", money)
    createUser(pseudo, money).then(rst => {
        if (rst === undefined) {
            ws.send('User not created');
            return;
        }
        ws.send(JSON.stringify(rst));
    }).catch((err) => {
        console.error("error executing query:", err);
        ws.send('Error : ' + err);
    });
}


const deleteUserWS = (ws, message) => {
    const id = message.content.id
    deleteUser(id).then(rst => {
        console.log("Rst : ", rst)
        if (rst === undefined) {
            ws.send('User not found');
            return;
        }
        ws.send(JSON.stringify(rst));
    }).catch((err) => {
        console.error("error executing query:", err);
        ws.send('Error : ' + err);
    });
}

const getUserMoney = (ws, message) => {
    const id = message.content.id
    console.log("ID : ", id)
    readMoneyById(id).then(rst => {
        if (rst === undefined) {
            ws.send('User not found');
            return;
        }
        ws.send(JSON.stringify(rst));
    }).catch((err) => {
        console.error("error executing query:", err);
        ws.send('Error : ' + err);
    });
}

const removeUserMoney = (ws, message) => {
    const id = message.content.id
    const money = message.content.money
    updateMoneyById(id, -money).then(rst => {
        console.log("Rst : ", rst)
        if (rst === undefined) {
            ws.send('User not found');
            return;
        }
        ws.send(JSON.stringify(rst));
    }).catch((err) => {
        console.error("error executing query:", err);
        ws.send('Error : ' + err);
    });
}

const addUserMoney = (ws, message) => {
    const id = message.content.id
    const money = message.content.money
    updateMoneyById(id, money).then(rst => {
        console.log("Rst : ", rst)
        if (rst === undefined) {
            ws.send('User not found');
            return;
        }
        ws.send(JSON.stringify(rst));
    }).catch((err) => {
        console.error("error executing query:", err);
        ws.send('Error : ' + err);
    });
}

export { commandManagement };
