import express from "express";
import { getEndpointController } from "../controller/firstEndpointController.js";

const route = express.Router()

route
    .get("/", getEndpointController)
    .get("/byId/:id", () => {});

export default route