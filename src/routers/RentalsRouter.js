import { Router } from "express";
import { deleteRental, finishRental, getRentals, insertRental } from "../controllers/Rentals.js";

const RentalsRouter = Router();

RentalsRouter.post("/rentals", insertRental);
RentalsRouter.post("/rentals/:id/return", finishRental);
RentalsRouter.get("/rentals", getRentals);
RentalsRouter.delete("/rentals/:id", deleteRental);