import express from "express";
import { create, deleteOne, getAll, getOne, updateOne } from "../controllers/userController.js";
const route = express.Router();

route.post("/create",create);
route.get("/getAll",getAll);
route.get("/getOne/:id",getOne);
route.put("/update/:id",updateOne);
route.delete("/delete/:id",deleteOne);

export default route;