import db from "../config/database.js";

export async function ReturnDateValidator(req,res,next){
    const { id } = req.params;
    try{
        const rent = await db.query('SELECT * FROM rentals WHERE id = $1', [id]);
        if (rent.rows.length === 0) return res.sendStatus(404);
        if (rent.rows.returnDate === null) return res.sendStatus(400);
    } catch (err){
        return res.status(500).send(err.message);
    }
    next();
}