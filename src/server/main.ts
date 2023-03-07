import express from 'express'
import ViteExpress from 'vite-express'
import mongoose from 'mongoose'
const cors = require('cors')

import { db_connection } from './db/connection.js'
import routes from './routes'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(routes)

mongoose.connect(db_connection!)

ViteExpress.listen(app, 3000, () =>
  console.log('Server is listening on port 3000...')
)
