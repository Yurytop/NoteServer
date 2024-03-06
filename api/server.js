const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('notes.json')
const middlewares = jsonServer.defaults()
const cors = require("cors");
app.use(cors());

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