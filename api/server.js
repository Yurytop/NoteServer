const jsonServer = require('json-server')
const fs = require("fs");
const os = require("os");
const path = require("path");
const server = jsonServer.create();
const router = jsonServer.router(path.resolve(os.tmpdir() + "/notes.json"));

const middlewares = jsonServer.defaults()
const cors = require('cors');


fs.copyFile("notes.json", os.tmpdir() + "/notes.json", function (err) {
  if (err) console.log(err);
  else console.log("copy file succeed to" + os.tmpdir());
});

server.use(middlewares)
        
server.use(jsonServer.rewriter({
  '/api/*': '/$1',
  '/notes/:resource/:id/show': '/:resource/:id'
}))
server.use(router);

server.use(cors({
  origin: true,
  credentials : true,
  preflightContinue: false,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
}));

server.options('*', cors());

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

server.listen(3000, () => {
    console.log('JSON Server is running')
})

module.exports = server