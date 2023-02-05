require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const app = express();

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(cors());

app.use(express.json());

app.use(routes);

mongoose.set('strictQuery', false)

mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vkbkvxp.mongodb.net/bancoapicontact?retryWrites=true&w=majority`
)
    .then(() => {
        console.log('Conectado ao MongoDB!')
        app.listen(8000)
    })
    .catch((err) => console.log(err));