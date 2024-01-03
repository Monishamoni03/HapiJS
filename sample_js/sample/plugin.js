"use strict";

const Hapi = require("@hapi/hapi");
const Inert = require("@hapi/inert");
const path = require("path");

const init = async () => {
  const server = Hapi.server({
    port: 3001,
    host: "localhost",
    // routes: {
    //   files: {
    //     relativeTo: path.join(__dirname, "static_file"),
    //   },
    // }
  });

  //GEO-LOCATE
  await server.register([
    {
      plugin: require("hapi-geo-locate"),
      options: {
        enabledByDefault: true,
      },
    },
    {
      plugin: Inert,
    },
    {
      plugin: require("@hapi/vision")

    }
  ]);

  server.views({
    engines: {
      // html: require("handlebars")
      hbs: require("handlebars")  //rename file index.html -> index.hbs
    },
    path: path.join(__dirname, "views"),
    layout: "default"
  })

  server.route([
    {
      method: "GET",
      path: "/",
      handler: (request, h) => {
        // console.log("request: ", request);
        // return "<h2>Plugins!</h2>";
        return h.file("static_file/welcome.html");
      },
    },
    {
      method: "GET",
      path: "/dynamic",
      handler: (request, h) => {
        const data = {
          name: 'Monisha'
        }
        return h.view('index', data)
      },
    },
    {
      method: "POST",
      path: "/login",
      handler: (request, h) => {
        console.log('Login: ', request.payload.username, request.payload.password);
        //DYNAMIC WAY
        return h.view('index', {username: request.payload.username})
        //STATIC WAY
        // if (request.payload.username === 'Moni' && request.payload.password === 'Moni') {
        //   return h.file("static_file/logged-in.html")
        // } else {
        //   // return "<h2>Invalid credentials.</h2>"
        //   return h.redirect('/');
        // }
      }
    },
    {
      method: "GET",
      path: "/download",
      handler: (request, h) => {
        return h.file("static_file/welcome.html", {
          mode: "attachment",
          filename: "welcome-download.html"
        });
      },
    },
    {
      method: "GET",
      path: "/location",
      handler: (request, h) => {
        if (request.location) {
          // return request.location;
          return h.view('location', {location: `IP Address: ${request.location.ip}`})
        } else {
          return h.view('location', {location: "Your location is not enabled!"})
        }
      },
    },
  ]);

  await server.start();
  console.log("Server running on info", server.info);
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (error) => {
  console.log("Error in unhandledRejection", error);
  process.exit(1);
});

init();
