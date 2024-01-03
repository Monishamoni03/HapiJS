import { Request, ResponseObject, ResponseToolkit } from "@hapi/hapi";
import UserService from "../service/userService";

const userService = new UserService();

class UserController {
    public registerUser = async (req: Request, res: ResponseToolkit) => {
        try {
            const userSaved = await userService.registerUserService(req.payload)
            return res.response({ message: "User registered successfully!", userSaved })
        } catch (error) {
            return res.response({ error: error }).code(500)
        }
    }

    public getAllUsers = async (req: Request, res: ResponseToolkit): Promise<ResponseObject> => {
        try {
            const users = await userService.getAllUsersService()
            return res.response({ message: "successfully retrieved users", users }).code(200)
        }
        catch (error) {
            return res.response({ error: error }).code(500)
        }
    }

    public getUserById = async (req: Request, res: ResponseToolkit): Promise<ResponseObject> => {
        try {
            const user = await userService.getUserByIdService(req.params.id)
            return res.response({ user }).code(200)
        }
        catch (error) {
            return res.response({ error: error }).code(500)
        }
    }

    public updateUser = async (req: Request, res: ResponseToolkit): Promise<ResponseObject> => {
        try {
            const updateUser = await userService.updateUserService(req.payload, req.params.id)
            return res.response({ message : "User updated successfully", updateUser }).code(200)
        }
        catch (error) {
            return res.response({ error: error }).code(500)
        }
    }

    public deleteUser = async (req: Request, res: ResponseToolkit): Promise<ResponseObject> => {
        try {
            const deleteUser = await userService.deleteUserService(req.params.id)
            return res.response({ message : "User deleted successfully", deleteUser }).code(200)
        }
        catch (error) {
            return res.response({ error: error }).code(500)
        }
    }
}

export default UserController;
