import { Router } from "express";
import { getCustomers, getCustomerById, insertCustomer, updateCustomer } from "../controllers/Customers.js";

const CustomersRouter = Router();


CustomersRouter.post("/customers", insertCustomer);
CustomersRouter.get("/customers", getCustomers);
CustomersRouter.get("/customers/:id", getCustomerById);
CustomersRouter.put("/customers/:id", updateCustomer);