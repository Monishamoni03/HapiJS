import User from "../model/user";
import UserRepository from "../repository/userRepository";
import { userValidationSchema } from "../validation/user-validation-schema";

const userRepository = new UserRepository();

class UserService {

  public registerUserService = async (userPayload: any): Promise<Object> => {
    const validation = userValidationSchema(userPayload);
    if (validation.error?.isJoi) {
      const errors: any = [];
      validation.error.details.forEach((detail) => {
        console.log("registerUserService", detail.path.toString());
        let error: any = {
          [detail.path.toString()]: detail.message,
        };
        errors.push(error);
      });

      return errors;
    }

    const user = new User(userPayload);
    const userSaved = await userRepository.registerUserRepository(user);
    return userSaved;
  };

  public getAllUsersService = async (): Promise<Object> => {
    const users = await userRepository.getAllUserRepository(User);

    return users;
  };

  public getUserByIdService = async (userId: any): Promise<Object> => {
    const user = await userRepository.getUserByIdRepository(User, userId);

    return user;
  };

  public updateUserService = async (
    userPayload: any,
    userId: any
  ): Promise<Object> => {
    const validation = userValidationSchema(userPayload);

    if (validation.error?.isJoi) {
      const errors: any = [];
      validation.error.details.forEach((detail) => {
        console.log("updateUserService", detail.path.toString());
        let error: any = {
          [detail.path.toString()]: detail.message,
        };
        errors.push(error);
      });

      return errors;
    }
    const updateUser = await userRepository.updateUserRepository(
      User,
      userPayload,
      userId
    );

    return updateUser;
  };

  public deleteUserService = async (userId: any): Promise<Object> => {
    const deleteUser = await userRepository.deleteUserRepository(User, userId);

    return deleteUser;
  };
}

export default UserService;
