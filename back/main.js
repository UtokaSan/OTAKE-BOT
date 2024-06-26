import express from 'express';
import cors from 'cors';
import { Server } from "socket.io";
import { routerUser } from "./routers/userRouter.js";
import { routerMoney } from "./routers/moneyRouter.js";
import { routerCard } from "./routers/cardRouter.js";
import Database from "./db/db.js";
import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;
const corsOptions = {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true
};

// init DB
const dbInstance = Database.getInstance();
dbInstance.getClient();

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.get('/', (req, res) => {
    console.log('Requête GET reçue');
    res.send('Hello ! The server Run On ^^');
});

app.use('/user', routerUser);
app.use('/money', routerMoney);
app.use('/card', routerCard);

app.post('/data', (req, res) => {
    console.log('Données reçues :', req.body);
    res.send('Données reçues avec succès !');
});

const server = app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});

const io = new Server(server, {
    pingTimeout: 30000,
    pingInterval: 25000,
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"],
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log('Un client est connecté', socket.id);

    socket.on('error', (error) => {
        console.error('Erreur WebSocket:', error);
    });

    socket.on('ping', (data) => {
        console.log('Événement reçu et ca pong:', data);
    });

    socket.on('disconnect', () => {
        console.log("Un client vien de se déconnecté");
    });

    socket.on("present", (data) => {
        console.log("presence : ", data);
        io.emit('multiplayer', data);
        console.log("send");
    });

    socket.emit('bienvenue', {message: 'Bienvenue sur le serveur Socket.IO!'});
});
