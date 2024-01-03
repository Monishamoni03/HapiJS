"use strict";

const Hapi = require("@hapi/hapi");
require("./database")

const init = async () => {
  const server = Hapi.server({
    port: 3001,
    host: "localhost",
  });

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "<h2>Hello World!</h2>";
    },
  });

  //COMBINED ROUTES

  server.route([
    {
      method: "GET",
      path: "/users/",
      handler: (request, h) => {
        return "<h2>Hello User!</h2>";
      },
    },
    {
      method: "GET",
      path: "/users/{user?}",
      handler: (request, h) => {
        if (request.params.user) {
          return `<h2>Hello ${request.params.user}!</h2>`;
        } else {
          return "<h2>Hello Stranger!</h2>";
        }
      },
    },

    //QUERY PARAMETER
    // {
    //   method: "GET",
    //   path: "/users/{user?}",
    //   handler: (request, h) => {
    //     return `<h2>${request.query.name} ${request.query.lastname}</h2>`
    //   },
    // },
  ]);

  //REDIRECT
  // server.route({
  //   method: "GET",
  //   path: "/users",
  //   handler: (request, h) => {
  //     return h.redirect("/");
  //   },
  // });

  //404 ERRORS
  server.route({
    method: "GET",
    path: "/{any*}",
    handler: (request, h) => {
      return "<h2>404, PAGE NOT FOUND</h2>";
    },
  });

  await server.start();
  console.log("Server running on info", server.info);
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (error) => {
  console.log("Error in unhandledRejection", error);
  process.exit(1);
});

init();

// server.route({
//   method: "GET",
//   path: "/users/{user?}",
//   handler: (request, h) => {
//     // return "<h2>Hello User!</h2>";

//     // if (request.params.user) {
//     //   return `<h2>Hello ${request.params.user}!</h2>`;
//     // } else {
//     //   return '<h2>Hello Stranger!</h2>';
//     // }

//     //QUERY PARAMETER
//     //return `<h2>${request.query.name} ${request.query.lastname}</h2>`
//   },
// });
