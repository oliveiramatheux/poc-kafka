import server from './server.js'

const serverPort = 8000

server.listen(serverPort, () => console.log(`Server up, listening on ${serverPort}`))
