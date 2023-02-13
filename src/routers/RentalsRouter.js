import { Router } from "express";
import { deleteRental, finishRental, getRentals, insertRental } from "../controllers/Rentals.js";
import { returnDateValidator } from "../middlewares/rentalValidations.js";
import validatorSchema from "../middlewares/validatorSchema.js";
import rentSchema from "../schemas/rentSchema.js";

const RentalsRouter = Router();

RentalsRouter.post("/rentals", validatorSchema(rentSchema), insertRental);
RentalsRouter.post("/rentals/:id/return", returnDateValidator, finishRental);
RentalsRouter.get("/rentals", getRentals);
RentalsRouter.delete("/rentals/:id", returnDateValidator, deleteRental);

export default RentalsRouter;