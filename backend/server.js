const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const  dbURI = "mongodb://localhost/backend"
app.use(express.json())

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect(dbURI , {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
mongoose.set('strictQuery', false);

db.on("error", (err)=>{console.error(err)})
db.once("open", () => {console.log("DB started successfully")})


// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
