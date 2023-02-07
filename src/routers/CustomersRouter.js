import { Router } from "express";
import { getCustomers, getCustomerById, insertCustomer, updateCustomer } from "../controllers/Customers.js";
import validatorSchema from "../middlewares/validatorSchema.js";
import customerSchema from "../schemas/customerSchema.js";

const CustomersRouter = Router();


CustomersRouter.post("/customers", validatorSchema(customerSchema), insertCustomer);
CustomersRouter.get("/customers", getCustomers);
CustomersRouter.get("/customers/:id", getCustomerById);
CustomersRouter.put("/customers/:id", updateCustomer);

export default CustomersRouter;