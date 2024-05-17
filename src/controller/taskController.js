import { Task } from "../models/Task.js";
import * as bcrypt from 'bcrypt';

export const createTask = async (req, res) => {
    const {body} = req;
    try {
        const hashPassword = await bcrypt.hash(body.password, 10)
        console.log(body)
        const task = await Task.create({
            ...body,
            password: hashPassword
        })

        res.json({
            ok: true,
            task,
            msg: "Tarea creada correctamente."
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

export const listTask = async (req, res) => {

    const { page } = req.query;
    const docsPerPage = 3;
    const skip = (parseInt(page) - 1) * docsPerPage

    try {
        const taks = await Task.find({ deletedAt: { $in: [null, undefined] }}) // Decimos busca las tareas cuya fecha de eliminaciòn sea null O undefined
            .select("-password -__v -createdAt")
            .skip(skip)
            .limit(docsPerPage)
            // .sort({userName: -1}) atributo segun queremos ordenar (1: asc | -1: desc)

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
        // const newUser = await User.findOneAndUpdate({email: "unemail@gmail.com"}, req.body, { new: true })

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

        await Task.findByIdAndDelete(id); //Elimina Permanentemente el dato (NO SE RECUPERA MÀS!!)
        //await Task.findByIdAndUpdate(id, {deletedAt: new Date()}, { new: true })

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