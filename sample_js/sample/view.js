import Hapi from "@hapi/hapi";
import vision from "vision";
import Handlebars from "handlebars";

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: "localhost",
  });

  await server.register({
    plugin: vision,
  });

  server.views({
    engines: {
      html: Handlebars,
    },
    path: "./views",
  });

  server.route({
    method: "GET",
    path: "/",
    handler: {
      view: "index.html",
    },
  });

  await server.start();
  console.log("Server running on port %s", server.info.uri);
};

process.on("unhandledRejection", (error) => {
  console.log("Error in unhandledRejection: ", error);
  process.exit(1);
});

init();
