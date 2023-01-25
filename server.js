const express = require('express')
const app = express()
const volleyball = require('volleyball')
const cors = require('cors')
const routes = require('./routes')
const db = require('./config/db')
const PORT = 5000

app.use(express.json())
app.use(
    cors({
      origin: "https://localhost:5000",
      credentials: true,
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
