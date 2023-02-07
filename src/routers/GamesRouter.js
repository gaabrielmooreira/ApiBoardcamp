import { Router } from "express"
import { getGames, insertGame } from "../controllers/Games.js";


const GamesRouter = Router();


GamesRouter.post("/games", insertGame);
GamesRouter.get("/games", getGames);

export default GamesRouter;