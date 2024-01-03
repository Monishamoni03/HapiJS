const User = require("../model/user");

module.exports = [
    {
        method: "GET",
        path: "/users",
        handler: async (request, h) => {
            try {
                const users = await User.find();
                return users;
            } catch (error) {
                return h.response(error).code(500);
            }
        }
    },
    {
        method: "GET",
        path: "/users/{id}",
        handler: async (request, h) => {
            try {
                const user = await User.findById(request.params.id);
                if (!user) {
                    return h.response("User not found!").code(404);
                }
                return user;
            } catch (error) {
                return h.response(error).code(500);
            }
        }
    },
    {
        method: "POST",
        path: "/users",
        handler: async (request, h) => {
            try {
                const user = new User(request.payload);
                await user.save();
                return user;
            } catch (error) {
                return h.response(error).code(500);
            }
        }
    },
    {
        method: "PUT",
        path: "/users/{id}",
        handler: async (request, h) => {
            try {
                const user = await User.findByIdAndUpdate(
                    request.params.id,
                    request.payload,
                    { new: true }
                );
                if (!user) {
                    return h.response("User not found to update!").code(404);
                }
                return user;
            } catch (error) {
                return h.response(error).code(500);
            }
        }
    },
    {
        method: "DELETE",
        path: "/users/{id}",
        handler: async (request, h) => {
            try {
                const user = await User.findByIdAndDelete(request.params.id);
                if (!user) {
                    return h.response("User not found to delete!").code(404);
                }
                return h.response().code(204);
            } catch (error) {
                return h.response(error).code(500);
            }
        }
    },
]