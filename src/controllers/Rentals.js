import dayjs from "dayjs";
import db from "../config/database.js";

export async function getRentals(_, res) {
    try {
        const result = await db.query(
            `
                SELECT rentals.*,
                    JSON_BUILD_OBJECT(
                        'id', customers.id,
                        'name', customers.name
                    ) AS customer,
                    JSON_BUILD_OBJECT(
                        'id', games.id,
                        'name', games.name
                    ) AS game
                FROM rentals
                JOIN games
                ON games.id = rentals."gameId"
                JOIN customers
                ON customers.id = rentals."customerId";
            `
        );
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
            VALUES ($1,$2,$3,$4,$5,$6,$7);`, [customerId, gameId, dateNow, daysRented, null, originalPrice, null]
        );
        res.sendStatus(201);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function finishRental(req, res) {
    const { id } = req.params;
    const dateNow = dayjs();
    
    try {
        const rentById = await db.query('SELECT * FROM rentals WHERE id = $1', [id]);
        if (rentById.rows.length === 0) return res.sendStatus(404);
        if (rentById.rows[0].returnDate !== null) return res.sendStatus(400);

        const pricePerDay = rentById.rows[0].originalPrice / rentById.rows[0].daysRented;
        const daysDiff = Math.ceil(dateNow.diff(rentById.rows[0].rentDate, 'hours') / 24) - rentById.rows[0].daysRented;

        const delayFee = daysDiff > 0 ? (daysDiff * pricePerDay):0;
        await db.query(`UPDATE rentals SET ("returnDate", "delayFee") = ($1, $2) WHERE id = $3;`, [dateNow, delayFee, id]);
        res.send();
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function deleteRental(req, res) {
    const { id } = req.params;
    try {
        const rentById = await db.query('SELECT * FROM rentals WHERE id = $1', [id]);
        if (rentById.rows.length === 0) return res.sendStatus(404);
        if (rentById.rows[0].returnDate === null) return res.sendStatus(400);
        await db.query('DELETE FROM rentals WHERE id = $1;', [id]);
        res.send();
    } catch (err) {
        return res.status(500).send(err.message);
    }
}