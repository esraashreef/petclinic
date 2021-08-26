

const express = require("express")
const mongoose = require('mongoose')

const Article = require('./models/article')

const articlerouter=require('./routes/articles')

const methodoverride = require ('method-override')
const app = express()





mongoose.connect('mongodb://localhost/blog',{ useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex:true})



app.set( 'view engine','ejs')
app.use(express.urlencoded({ extended: false }))
app.use (methodoverride('_method'))




const port = 5500;
app.use(express.static('public'))

app.get('/', async(req,res) =>{
  res.render('index')
});


app.get('/resort', async(req,res) =>{
 res.render('resort')
});

app.get('/wellness', async(req,res) =>{
    res.render('wellness')
});

app.use('/articles',articlerouter)
const server = app.listen(port);




