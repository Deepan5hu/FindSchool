const express = require('express');

const Router = express.Router();
const upload = require('./middleware')
const {FormSubmit,GetImage,getListing} = require('./controllers')



Router.post('/formSubmit',upload.single('image'),FormSubmit);

Router.get('/getImage/:filename',GetImage);

Router.get('/getSchools',getListing);

module.exports = Router;