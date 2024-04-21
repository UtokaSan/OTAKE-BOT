import express from 'express';
import { routerUser } from "./routers/userRouter.js";
import cors from 'cors';
import { routerMoney } from "./routers/moneyRouter.js";
import { routerCard } from "./routers/cardRouter.js";
import { Server } from "socket.io";
import Database from "./db/db.js";


const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({origin: '*'}));

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

const client = Database.getInstance().getClient();

const server = app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});

const io = new Server(server);

io.on('connection', (socket) => {
    console.log('Un client est connecté');

    socket.on('ping', (data) => {
        console.log('Événement reçu:', data);
    });

    socket.on('present', (data) => {
        console.log('present :', data);
    });

    socket.on('disconnect', () => {
        console.log("Un client vien de se déconnecté"); // Affiche un message lorsque le client se déconnecte
    });

    socket.emit('bienvenue', {message: 'Bienvenue sur le serveur Socket.IO!'});
});

