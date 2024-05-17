import { Task } from "../models/Task.js";

export const createTask = async (req, res) => {
    const { title, description } = req.body;
    try {
        const task = await Task.create({
            title,
            description,
            createdAt: new Date(),
        });

        res.json({
            ok: true,
            task,
            msg: "Tarea creada correctamente."
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Ha habido un error en el servidor."
        });
    }
};

export const listTask = async (req, res) => {

    const { page } = req.query;
    const docsPerPage = 3;
    const skip = (parseInt(page) - 1) * docsPerPage

    try {
        const taks = await Task.find({ deletedAt: { $in: [null, undefined] }}) // Decimos busca las tareas cuya fecha de eliminaciòn sea null O undefined
            .select("-__v -createdAt")            
            .skip(skip)
            .limit(docsPerPage)

        res.json({
            ok: true,
            taks
        })
    } catch (error) {
        console.log(error)
        res.status(500)
            .json({
                ok: false,
                msg: "Ha habido un error en el servidor."
            })
    }
}

export const getTaskById = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findById(id).select("-__v -createdAt");

        if (!task) {
            return res.status(404).json({
                ok: false,
                msg: "No se ha encontrado la tarea"
            });
        }

        res.json({
            ok: true,
            task
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Ha habido un error en el servidor."
        });
    }
};

export const editTask = async (req, res) => {

    const { id } = req.params

    try {
        const foundTask = await Task.findOne({
            _id: id,
            deletedAt: { $in: [null, undefined]}
        })

        if (!foundTask) {
            return res.status(404)
                .json({
                    ok: false,
                    msg: "No se ha encontrado la tarea a editar"
                })
        }

        const newTask = await Task.findByIdAndUpdate(id, req.body, { new: true })

        res.json({
            ok: true,
            task: newTask,
            msg: "La tarea se editó correctamente"
        })

    } catch (error) {
        console.log(error)
        res.status(500)
            .json({
                ok: false,
                msg: "Ha habido un error en el servidor."
            })
    }
}

export const deleteTask = async (req, res) => {
    
    const { id } = req.params

    try {
        const foundTask = await Task.findOne({
            _id: id,
            deletedAt: { $in: [null, undefined]}
        })

        if (!foundTask) {
            return res.status(404)
                .json({
                    ok: false,
                    msg: "No se ha encontrado la tarea a eliminar"
                })
        }

        await Task.findByIdAndDelete(id); //Elimina Permanentemente el dato 

        res.json({
            ok: true,
            msg: "la tarea se eliminó correctamente"
        })

    } catch (error) {
        console.log(error)
        res.status(500)
            .json({
                ok: false,
                msg: "Ha habido un error en el servidor."
            })
    }
}