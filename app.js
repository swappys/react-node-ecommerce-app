const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config()

//import routes
const userRoutes = require('./routes/user');


const app = express();


//db connection
mongoose.connect(
    process.env.DATABASE,
    {
        useNewUrlParser: true,
        useCreateIndex: true
    }
)
    .then(() => console.log('DB Connected'))

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
});

//middlewares
app.use(morgan('dev'))
//to get json data form req body
app.use(bodyParser.json())
//saving user data in cookies
app.use(cookieParser())
//routes middleware
app.use('/api', userRoutes);

const port = process.env.PORT || 9090
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
