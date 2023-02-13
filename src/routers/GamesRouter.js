import { Router } from "express"
import { getGames, insertGame } from "../controllers/Games.js";
import validatorSchema from "../middlewares/validatorSchema.js";
import gameSchema from "../schemas/gameSchema.js";


const GamesRouter = Router();


GamesRouter.post("/games", validatorSchema(gameSchema), insertGame);
GamesRouter.get("/games", getGames);

export default GamesRouter;