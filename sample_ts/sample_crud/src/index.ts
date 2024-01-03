import { Server } from "@hapi/hapi";
import { routes } from "./route/userRoute";
import "./database";

const init = async () => {
  const server: Server = new Server({
    port: 9000,
    host: "localhost",
  });

  routes(server);
  await server.start();
  // console.log("Server running on info", server.info);
  console.log("Server running on %s", server.info.uri);

};
  process.on("unhandledRejection", (error) => {
    console.log("Error in unhandledRejection", error);
    process.exit(1);
  });

init();
