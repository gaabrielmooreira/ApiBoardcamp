import express from 'express';
import cors from 'cors';
import GamesRouter from './routers/GamesRouter.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use([GamesRouter]);

app.listen(PORT, () => console.log(`Servidor iniciado com sucesso na PORT: ${PORT}`));