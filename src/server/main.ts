import express from 'express'
import ViteExpress from 'vite-express'
// import session from 'express-session'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { db_connection } from './db/connection'
import routes from './routes'

mongoose
  .connect(db_connection)
  .then(() => {
    console.log('Connected to MongoDB')
    startServer()
  })
  .catch((err) => console.error(err))

function startServer() {
  const app = express()

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cors({ credentials: true }))
  app.use(cookieParser())
  app.use(routes)

  ViteExpress.listen(app, 3000, () =>
    console.log('Server is listening on port 3000...')
  )
}
