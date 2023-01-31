const express = require('express')
const app = express()
const volleyball = require('volleyball')
const cors = require('cors')
const routes = require('./routes')
const db = require('./config/db')
const PORT = 5000
const morgan =require("morgan")
const cookieParser =require("cookie-parser")

app.use(morgan("tiny"))
app.use(express.json())
app.use(cookieParser())

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    
  })
);
app.use(volleyball)


app.use('/api', routes)

db.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log('Listening on port 5000 🚀')
    })
  })
  .catch((err) => {
    console.log(err)
  })
