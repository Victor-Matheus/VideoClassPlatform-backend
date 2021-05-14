'use strict'

const app = require('../src/app');
const http = require("http");
const debug = require("debug")("Back-end:server");

const normalizePort = (value) => {
  const port = parseInt(value, 10);

  if (isNaN(port)) return value;

  if (port >= 0) return port;

  return false;
};
//////
const port = normalizePort(process.env.PORT || "3001");
app.set("port", port);
//////
const server = http.createServer(app);

const onError = (error) => {
    if(error.syscall !== 'listen') throw error;

    const bind = typeof port === 'string' ?
    `Pipe ${port}` :
    `Port ${port}`;

    switch(error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges.`);
            process.exit(1);
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
        default:
            throw error;
    }
}


// This function starts debuger
const onListening = () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 
        `pipe ${address}` :
        `port ${address.port}`;
    debug(`Listening on ${bind}`);
}

server.listen(port, () => console.log(`API rodando na porta ${port}`));
server.on("error", onError);
server.on("listening", onListening);

module.exports = server