const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('tmp/notes.json')
const middlewares = jsonServer.defaults()
const cors = require('cors');

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