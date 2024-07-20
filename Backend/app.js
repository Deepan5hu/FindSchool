const express = require('express');
const app = express();
const {connection} = require('./db.config');
const Router = require('./routes');
const cors = require('cors')
require('dotenv').config();
const Port = process.env.Port || 8081;
app.use(cors());
app.use(express.json());

/**API */
app.use('/school',Router)




app.listen(Port, async() => {
    connection;
    console.log(`Server is running at ${Port}`);
});