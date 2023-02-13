import db from "../config/database.js";

export async function getCustomers(req, res) {
    try {
        const result = await db.query("SELECT * FROM customers;");
        res.send(result.rows);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function getCustomerById(req, res) {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM customers where id = $1;', [id]);
        if (result.rows.length === 0) return res.sendStatus(404);
        res.send(result.rows);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function insertCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body;
    try {
        const cpfExists = await db.query('SELECT 1 FROM customers where cpf = $1;', [cpf]);
        if (cpfExists.rows.length !== 0) return res.sendStatus(409);

        await db.query('INSERT INTO customers (name, phone, cpf, birthday) values ($1,$2,$3,$4);', [name, phone, cpf, birthday]);
        res.sendStatus(201);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function updateCustomer(req, res) {
    const { id } = req.params;
    const { name, phone, cpf, birthday } = req.body;

    try {
        const cpfSearch = await db.query('SELECT * FROM customers where cpf = $1;', [cpf]);
        if(cpfSearch.rows.length !== 0 && cpfSearch.rows[0]?.id !== Number(id)) return res.sendStatus(409);

        await db.query('UPDATE customers SET (name, phone, cpf, birthday) = ($1,$2,$3,$4) where id = $5;', [name, phone, cpf, birthday, id]);
        res.send("OK");
    } catch (err) {
        return res.status(500).send(err.message);
    }
}