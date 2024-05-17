import express from "express";
import { createUser, deleteUser, editUser, listUsers } from "../controller/taskController.js";
import { body, param } from "express-validator";
import { validationErrorResponse } from "../middlewares/validations.js";

const route = express.Router()

route
    .post("/create", 
    [
        body("title")
            .isString().isLength({ min: 1}).withMessage("El nombre de la tarea es requerido"),
        body("description")
            .isString().isLength({ min: 10}).withMessage("La descripción de la tarea es requerido"),
        validationErrorResponse
    ],
    createUser)
    .get("/list-task", listTask)
    .put("/edit-task/:id", 
    [
        param("id")
            // .isLength({min: 24, max: 24})
            .isMongoId()
            .withMessage("El id no tiene el forma to adecuado."),
        validationErrorResponse
    ]
    ,editUser)
    .delete("/delete-user/:id", deleteUser)

export default route;