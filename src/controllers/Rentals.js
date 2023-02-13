import dayjs from "dayjs";
import db from "../config/database.js";

export async function getRentals(req, res) {
    try {
        const result = await db.query("SELECT * FROM rentals;");
        res.send(result.rows);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function insertRental(req, res) {
    const { customerId, gameId, daysRented } = req.body;
    const rentDate = dayjs();
    // const originalPrice = daysRented * pricePerDay;
    try {
        const verifyCustomerId = await db.query('SELECT 1 FROM customers WHERE id = $1;', [customerId]);
        const verifyGameId = await db.query('SELECT * FROM games WHERE id = $1;', [gameId]);
        const gameAvailable = await db.query('SELECT id FROM rentals WHERE gameId = $1', [gameId]);
        if (verifyCustomerId.rows.length === 0 || verifyGameId.rows.length === 0) return res.sendStatus(400);

    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function finishRental(req, res) {
    const { id } = req.params;
    const dateNow = dayjs();
    const delayFee = ;
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