import express from "express"
import dotenvx from "@dotenvx/dotenvx"
dotenvx.config()
const app = express()
const port = process.env.PORT || 5000;


app.get('/', (req,res) => {
    res.send("Response from server");
})

app.listen(port , ()=> {
    return console.log(`Server is listening at http://localhost:${port}`)
})