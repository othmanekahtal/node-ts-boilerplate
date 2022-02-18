import 'module-alias/register'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import server from './server'

const port = process.env.PORT || 8080

dotenv.config({path: './.env'})
process.on('uncaughtException', (error: Error) => {
  console.log(`${error.name} : ${error.message}`)
  process.exit(1)
})
const database = process.env.HOSTED_DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
)

mongoose.connect(database).then(() => console.log('DB connection successful!'))
const app = server.listen(port, () => {
  console.log(`listen on port localhost:${port}`)
})

process.on('unhandledRejection', (error: Error) => {
  console.log(`${error.name} : ${error.message}`)
  app.close(() => {
    console.log('app stopped!')
    process.exit(1)
  })
})
