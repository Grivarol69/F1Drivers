const express = require("express");
const router = require("./routes/index.js");
const morgan = require("morgan");
// const cors = require('./cors');
const cors = require("cors");
require('dotenv').config();

const server = express();

//* Configurar CORS
// const whiteList = [process.env.FRONTEND_URL, process.env.BACKEND_URL];

// const corsOption = {
//   origin: function(origin, callback) {
//*     origin es cuando envío el query desde un cliente Postman o Imsomnia
//     if (!origin || whiteList.includes(origin)) {
//*       puede consultar la API
//       callback(null, true);
//     } else {
//       callback(new Error('Error de CORS'));
//     }
//   }
// }
// server.use(cors(corsOption));

server.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*") // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Credentials", "true")
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	)
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
	next()
})

server.use(cors());

// server.use(cors());
server.use(morgan("dev"));
server.use(express.json());

server.use("/", router);

// Error catching endware.
server.use((err, req, res, next) => {
	// eslint-disable-line no-unused-vars
	const status = err.status || 500
	const message = err.message || err
	console.error(err)
	res.status(status).send(message)
})

module.exports = server;
