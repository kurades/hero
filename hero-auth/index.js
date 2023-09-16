const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoute = require('./routes/auth.route')
const app = express();

dotenv.config({
    path: './config.env',
})

app.use(morgan('tiny'))

app.use(bodyParser.json())

app.use(cors({
    origin: 'http://localhost:4200',
    methods: 'GET,PUT,PATCH,POST,DELETE,HEAD',
    credentials: true,
}))

const connectDB = (url) => {
    return mongoose.connect(url);
}
app.get('/', (req, res) => {
    res.send('hello world');
})
app.use('/api/auth-manager', authRoute)
const start = async () => {
    try {
        await connectDB(process.env.MONGOURL)
        app.listen(process.env.PORT, (req, res) => {
            console.log(`Server is running on http://localhost:${process.env.PORT}`);
            console.log('DB connected');
        })
    } catch (error) {
        console.log(error);
    }
}

start()