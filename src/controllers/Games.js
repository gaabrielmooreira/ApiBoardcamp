import db from "../config/database.js";

export async function getGames(req, res) {
    try {
        const result = await db.query("SELECT * FROM games;");
        res.send(result.rows);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function insertGame(req, res) {
    const { name, image, stockTotal, pricePerDay } = req.body;
    console.log(stockTotal);

    if (stockTotal < 0 || pricePerDay < 0) return res.sendStatus(400);

    try {
        const result = await db.query("SELECT 1 FROM games WHERE name = $1;", [name]);
        const nameExists = result.rows;
        if (nameExists.length !== 0) return res.sendStatus(409);

        await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4);`, [name, image, stockTotal, pricePerDay]);
        res.sendStatus(201);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}