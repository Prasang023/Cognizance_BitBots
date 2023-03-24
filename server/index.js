import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import log from "./log.js"
import { port } from "./config.js"
import auth from "./auth/routes/index.js"

const app = express()

dotenv.config()

app.use(express.json())

app.use(cors({
    origin: '*'
}))

app.get("/", (req, res) => {
    log.debug([], "[request call")
    res.send("Hello World")
})

app.use('/auth', auth);

app.listen(port, () => {
  log.debug([port], "[lesenting on port]")
})