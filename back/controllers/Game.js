import { readUserById } from "../services/userService.js";
import { readCardById } from "../services/cardService.js";

let userConnected = {};
let stateOfFight = [];

const manageSocketGame = (io, socket) => {
    socket.on('register', (data) => {
        userConnected[socket.id] = data.playerId;
        console.log(userConnected);
    });

    socket.on("ping-game", (data) => {
        console.log("ping-game res");
        socket.emit("ping-game", {message: 'Pong Game'})
    })

    socket.on("info", (data) => getInfo(io, socket, data))
    socket.on("fight", (data) => fightSystem(io, socket, data))
    socket.on("acceptOtherPlayer", (data) => acceptOtherPlayerFight(io, socket, data))
    socket.on("acceptFight", (data) => acceptFight(io, socket, data))

    // socket.on("recieved-message", (data) => fightSystem(socket, data))
}

const getInfo = async (io, socket, data) => {
    console.log("userConnected : ", userConnected)

    console.log("State game : ", stateOfFight)
}

const fightSystem = async (io, socket, data) => {
    console.log("fight");
    const {playerId, cardId, otherPlayerId} = data

    let player = await readUserById(playerId);
    let card = await readCardById(cardId);
    let otherPlayer = await readUserById(otherPlayerId);

    if (!player || !card || !otherPlayer) {
        console.log("error to find : " + player, " : ", card, " : ", otherPlayer);
        return;
    }

    if (card.owner_id !== player.id) {
        console.log("ce joueur n'as pas la carte");
        return;
    }

    let socketOtherPlayer;

    for (const key in userConnected) {
        if (userConnected[key].trim() === otherPlayer.discord_id.trim()) {
            socketOtherPlayer = key
            console.log("key : ", key)
            break;
        }
    }

    if (!socketOtherPlayer) {
        console.log("Not connected")
        return
    }

    stateOfFight.push({
        player1: playerId,
        playerCard1: card[0].id,
        player2: otherPlayerId,
        playerCard2: null,
        statue: "WaitPlayer2"
    })

    await io.to(socketOtherPlayer).emit("wait", {message: player.pseudo + " te defie avec " + card[0].name + "( att : " + card[0].attack + ",pv : " + card[0].pv + " )."});

    console.log("End fightSystem");
}

const acceptOtherPlayerFight = async (io, socket, data) => {
    console.log("acceptOtherPlayerFight");
    const {otherPlayerId, otherCardId, playerId} = data

    let player = await readUserById(playerId);
    let card = await readCardById(otherCardId);
    let otherPlayer = await readUserById(otherPlayerId);

    if (!player || !card || !otherPlayer) {
        console.log("error to find : " + player, " : ", card, " : ", otherPlayer);
        return;
    }

    if (card.owner_id !== player.id) {
        console.log("ce joueur n'as pas la carte");
        return;
    }

    for (const game of stateOfFight) {
        if (game.player1 === playerId && game.player2 === otherPlayerId && game.statue === "WaitPlayer2") {
            game.playerCard2 = otherCardId;
            game.statue = "WaitPlayer1"
        }
    }

    console.log("End acceptOtherPlayerFight");
}

const acceptFight = async (io, socket, data) => {
    console.log("acceptFight");
    const {otherPlayerId, otherCardId, playerId} = data

    let player = await readUserById(playerId);
    let card = await readCardById(otherCardId);
    let otherPlayer = await readUserById(otherPlayerId);

    if (!player || !card || !otherPlayer) {
        console.log("error to find : " + player, " or ", card, " or ", otherPlayer);
        return;
    }

    if (card.owner_id !== player.id) {
        console.log("ce joueur n'as pas la carte");
        return;
    }

    console.log(stateOfFight);
    let gameData;

    for (const game of stateOfFight) {
        if (game.player1 === playerId && game.player2 === otherPlayerId && game.statue === "WaitPlayer1") {
            game.playerCard2 = otherCardId;
            game.status = "Fight";
            gameData = game;
            break;
        }
    }

    console.log("Game")
    console.log(gameData)

    fight(io, socket, gameData)

    console.log("End acceptFight");
}

const fight = (io, socket, data) => {

    // stateOfFight.push({
    //     player1: playerId,
    //     playerCard1: card[0].id,
    //     player2: otherPlayerId,
    //     playerCard2: null,
    //     statue: "WaitPlayer2"
    // })

    if (data.statue === "Fight") {
        let turnOfCard = Math.round(Math.random() * 2)

        while (true) {
            if (turnOfCard === 0) {
                data.playerCard2.pv -= data.playerCard1.attack
                if (data.playerCard2.pv >= 0) {
                    endFight(io, socket, {
                        player1: data.player1,
                        player2: data.player2
                    }, data.player1);
                } else {
                    turnOfCard = 1;
                    console.log("pv carte 2 :", data.playerCard2.pv)
                }
            } else {
                data.playerCard1.pv -= data.playerCard2.attack
                if (data.playerCard1.pv >= 0) {
                    endFight(io, socket, {
                        player1: data.player1,
                        player2: data.player2
                    }, data.player1);
                } else {
                    turnOfCard = 0;
                    console.log("pv carte 1 :", data.playerCard1.pv)
                }
            }
        }
    }

}

const endFight = (io, socket, players, winner) => {
    let sockets = [];

    for (const key in userConnected) {
        if (userConnected[key].trim() === players.player1) {
            sockets.push({
                id: players.player1,
                socket: key
            });
            console.log("key : ", key);
        } else {
            sockets.push({
                id: players.player2,
                socket: key
            });
            console.log("key : ", key);
        }
    }

    if (sockets.length !== 2) {
        console.log("we don't have 2 players");
        return
    }

    if (sockets[0].id === winner) {
        io.to(sockets[0].socket).emit("wait", {message: "vous avez ganger bravo"});
        io.to(sockets[1].socket).emit("wait", {message: "vous avez perdu :/."});
    } else {
        io.to(sockets[1].socket).emit("wait", {message: "vous avez ganger bravo"});
        io.to(sockets[0].socket).emit("wait", {message: "vous avez perdu :/."});
    }
}

export {
    manageSocketGame
}