import express from 'express';
import cors from 'cors';
import GamesRouter from './routers/GamesRouter.js';
import RentalsRouter from './routers/RentalsRouter.js';
import CustomersRouter from './routers/CustomersRouter.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use([GamesRouter, CustomersRouter, RentalsRouter]);

app.listen(PORT, () => console.log(`Servidor iniciado com sucesso na PORT: ${PORT}`));