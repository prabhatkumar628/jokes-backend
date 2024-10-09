import express from "express";
import dotenv from "dotenv"
import fs from "fs"
import cors from "cors"
dotenv.config({
    path: "./env"
})

let data
const readData = async () => {
    try {
        data = await fs.promises.readFile("./src/data.json", "utf-8")
    }
    catch (error) {
        console.log(error)
    }
}
readData()

const port = process.env.PORT || 3000

const app = express()

app.use(cors({
    origin: "https://jokesfrontend.netlify.app/",
    Credential: true
}))

app.get("/", (req, res) => {
    res.send("<h1>Server is Running with api data</h1>")
})
app.get("/api/data", (req, res) => {
    res.send(JSON.parse(data))
})
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})