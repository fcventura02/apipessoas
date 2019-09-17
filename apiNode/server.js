const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3001;
const cors = require('cors');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/persons',{useNewUrlParser:true}).then(
    ()=>{console.log('Database conectado')},
    err=>{console.log('Não foi possivel conectar o Database' + err)}
); 

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', require('./src/routes'));

    app.listen(port,()=>{
    console.log('server rodando na porta:',port);
});