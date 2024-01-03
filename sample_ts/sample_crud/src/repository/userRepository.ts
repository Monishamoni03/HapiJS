import { Model, Types } from "mongoose";
import { IUser } from "../utils/types";

class UserRepository {
    public registerUserRepository = async (user: IUser & { _id: Types.ObjectId }): Promise<Object> => {
        const dbResult = await user.save()
        return dbResult
    }

    public loginUserRepository = async (user: Model<IUser>, email: string, password: string): Promise<Object> => {
        const dbResult = await user.find({email: email, password: password})
        return dbResult
    }

    public getAllUserRepository =async (User: Model<IUser>): Promise<Object> => {
        const dbResult = await User.find()
        return dbResult
    }

    public getUserByIdRepository =async (User: Model<IUser, any>, userId: string): Promise<Object> => {
        const dbResult = await User.findById(userId)
        return dbResult
    }

    public updateUserRepository = async (User: Model<IUser, any>, userPayload: any, userId: string): Promise<Object> => {
        const dbResult = await User.findByIdAndUpdate(userId, userPayload)
        return dbResult
    }
 
    public deleteUserRepository = async (User: Model<IUser>, userId: string): Promise<Object> => {
        const dbResult = await User.findByIdAndDelete(userId)
        return dbResult
    }
}

export default UserRepository;
