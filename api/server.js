const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('notes.json')
// const middlewares = jsonServer.defaults({noCors: true})

server.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/notes/:resource/:id/show': '/:resource/:id'
}))
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})

module.exports = server