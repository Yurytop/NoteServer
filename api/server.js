const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('notes.json')
const middlewares = jsonServer.defaults()
const cors = require('cors');

        
server.use(cors({credentials : true, origin : ['https://notes-mauve-mu.vercel.app']}));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://notes-mauve-mu.vercel.app');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});
server.use(middlewares)
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/notes/:resource/:id/show': '/:resource/:id'
}))
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})

module.exports = server