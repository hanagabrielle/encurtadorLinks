import express from "express"
import roteador from "./src/routes/roteador.routes.js"
import bodyParser from "body-parser"
import cors from 'cors'
import invalidarRegistrosVencidos from './src/utils/invalidarRegistrosVencidos.js'

import database from './src/database/database.js'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json({ limit: '1mb' }))
app.use(cors())
const db_connection = await database.sync()
await invalidarRegistrosVencidos()
app.use(roteador)

const port = 3000
app.listen(port, () => {
    console.log(`Encurtador de links escutando a porta ${port}`)
})