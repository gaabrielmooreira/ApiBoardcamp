import dayjs from "dayjs";
import db from "../config/database.js";

export async function getRentals(_, res) {
    try {
        const result = await db.query("SELECT * FROM rentals;");
        res.send(result.rows);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function insertRental(req, res) {
    const { customerId, gameId, daysRented } = req.body;
    const dateNow = dayjs();
    
    try {
        const verifyCustomerId = await db.query('SELECT 1 FROM customers WHERE id = $1;', [customerId]);
        const gameById = await db.query('SELECT * FROM games WHERE id = $1;', [gameId]);
        const amountRentalsByGameId = await db.query(`SELECT count(*) FROM rentals WHERE "gameId" = $1;`, [gameId]);
        
        if (verifyCustomerId.rows.length === 0 || 
            gameById.rows.length === 0 || 
            amountRentalsByGameId.rows[0].count >= gameById.rows[0].stockTotal
        ) return res.sendStatus(400);

        const originalPrice = daysRented * gameById.rows[0].pricePerDay;
    
        await db.query(
            `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
            VALUES ($1,$2,$3,$4,$5,$6,$7);`,[customerId, gameId, dateNow, daysRented, null, originalPrice, null]
        );
        res.sendStatus(201);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function finishRental(req, res) {
    const { id } = req.params;
    const dateNow = dayjs();
    const delayFee = 1;
    try {

        res.send();
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function deleteRental(req, res) {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM rentals WHERE id = $1;', [id]);
        res.send();
    } catch (err) {
        return res.status(500).send(err.message);
    }
}