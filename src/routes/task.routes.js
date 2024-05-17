import express from "express";
import { createTask, getTaskById, deleteTask, editTask, listTask } from "../controller/taskController.js";
import { body, param } from "express-validator";
import { validationErrorResponse } from "../middlewares/validations.js";

const route = express.Router()

route
    .post("/create", 
        [
            body("title")
                .isString().notEmpty().withMessage("El nombre de la tarea es requerido"),
            body("description")
                .isString().notEmpty().withMessage("La descripción de la tarea es requerido"),
            validationErrorResponse
        ],
        createTask
    )
    .get("/list-task", listTask)
    .get("/:id", 
        [
            param("id").isMongoId().withMessage("El id no tiene el formato adecuado."),
            validationErrorResponse
        ],
        getTaskById
    )
    .put("/edit-task/:id", 
        [
            param("id")
                .isMongoId()
                .withMessage("El id no tiene el forma to adecuado."),
            validationErrorResponse
        ],
        editTask
    )
    .delete("/delete-task/:id", deleteTask)

export default route;