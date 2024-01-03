const Hapi = require("@hapi/hapi");
const routes = require("./route/userRoute");
require("./database");

const server = Hapi.server({
  port: 4000,
  host: "localhost",
});
server.route(routes);

const init = async () => {
    try {
        await server.start();
        console.log("Server is running  on port %s", server.info.uri);
    } catch (error) {
        console.log("Error starting server: ", error);
    }
};

init();
