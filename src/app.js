import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


app.listen(PORT, () => console.log(`Servidor iniciado com sucesso na PORT: ${PORT}`));