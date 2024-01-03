import { Server } from "@hapi/hapi";
import UserController from "../controller/userController";
import Joi from "joi";

const userController = new UserController;

export const routes = (server: Server) => {
    server.route({
        method: "POST",
        path: "/user",
        handler: userController.registerUser
    })

    server.route({
        method: "GET",
        path: "/users",
        handler: userController.getAllUsers
    })

    server.route({
        method: "GET",
        path: "/user/{id}",
        handler: userController.getUserById,
        options: {
            validate: {
                params: Joi.object({
                    id: Joi.string().length(24)
                })
            }
        }
    })

    server.route({
        method: "PUT",
        path: "/user/{id}",
        handler: userController.updateUser,
        options: {
            validate: {
                params: Joi.object({
                    id: Joi.string().length(24)
                })
            }
        }
    })

    server.route({
        method: "DELETE",
        path: "/user/{id}",
        handler: userController.deleteUser,
        options: {
            validate: {
                params: Joi.object({
                    id: Joi.string().length(24)
                })
            }
        }
    })
}