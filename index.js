const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

/*const http = require("http")
const server = http.createServer(app)*/
/*const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})*/

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})