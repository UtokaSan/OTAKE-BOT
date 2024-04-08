import express from 'express';
import { routerUser } from "./routers/userRouter.js";
import cors from 'cors';

const app = express();
const port = 3000;

// Middleware pour parser le corps des requêtes au format JSON
app.use(express.json());

app.use(cors({ origin: '*' }));




// Route GET
app.get('/', (req, res) => {
    console.log('Requête GET reçue');
    res.send('Bonjour depuis la route GET !');
});

app.use('/user', routerUser);


// Route POST
app.post('/data', (req, res) => {
    console.log('Données reçues :', req.body);
    res.send('Données reçues avec succès !');
});


app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});