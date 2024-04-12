import express from 'express';
import { routerUser } from "./routers/userRouter.js";
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { WebSocketRouter } from "./routers/webSocket.js";
import { routerMoney } from "./routers/moneyRouter.js";
import { routerCard } from "./routers/cardRouter.js";

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

const server = app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});

const wss = new WebSocketServer({server}); // Modification ici

wss.on('connection', WebSocketRouter);
