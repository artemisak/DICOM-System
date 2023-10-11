const express = require("express");
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const {authRouter, fileRouter, researchRouter, discussionRouter} = require('./routers');
const {exceptionMiddleware} = require('./middlewares');

process.env.PWD = __dirname;

//App
const app = express();
app.use(express.static('/home/art-isakov/DICOM-System/dicom-share-viewer/build'))
    .use(express.json({limit: '24mb'}))
    .use(cors({origin: 'http://77.234.215.138:4000', credentials: true, optionSuccessStatus: 200}))

app.use('*', (req, res, next) => {next()})
app.use('/auth', authRouter);
app.use('/file', fileRouter);
app.use('/research', researchRouter);
app.use('/discussion', discussionRouter);

app.use(exceptionMiddleware);

app.get('/', (req, res) => {
    res.sendFile('/home/art-isakov/DICOM-System/dicom-share-viewer/build/index.html');
});  

const startServer = () => {
    const port = process.env.PORT || 9000;

    try {
        app.listen(port, () => console.log(`Server is on port ${port}`));
    } catch (err) {
        console.error(err);
    }

    const mongooseOptions = {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true};
    mongoose.connect('mongodb://77.234.215.138/dsv', mongooseOptions, (err => {
        if (err) console.error('MongoDB connection error!');
        else console.log('MongoDB successfully connected!');
    }));
}

startServer();