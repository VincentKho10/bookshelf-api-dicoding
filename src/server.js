const Hapi = require("@hapi/hapi");
const createBookHandler = require("./handler/postBook");
const getAllBookHandler = require("./handler/getAllBook");
const getOneBookHandler = require('./handler/getOneBook')
const updateBookHandler = require('./handler/updateBook');
const deleteBookHandler = require("./handler/deleteBook");

const init = async () => {
  const hostname = "localhost";
  const port = 9000;

  const server = Hapi.server({
    host: hostname,
    port: port,
  });

  server.route([
    {
      method: "*",
      path: "/{any*}",
      handler: (req, h) => {
        return "Page Not Found";
      },
    },
    {
      method: "GET",
      path: "/books",
      handler: getAllBookHandler,
    },
    {
      method: 'GET',
      path: '/books/{id}',
      handler: getOneBookHandler
    },
    {
      method: "POST",
      path: "/books",
      handler: createBookHandler
    },
    {
      method: 'PUT',
      path: '/books/{id}',
      handler: updateBookHandler
    },
    {
      method: 'DELETE',
      path: '/books/{id}',
      handler: deleteBookHandler
    },
    {
      method: "*",
      path: "/",
      handler: (req, h) => {
        return "unknown handler";
      },
    },
  ]);

  console.log(`Server runs at ${server.info.uri}`);

  await server.start();
};

init();
