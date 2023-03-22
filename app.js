const express = require("express");
const path = require('path')
const checkListRouter = require('./src/routes/checklist')
const rootRouter = require('./src/routes/index')
require('./config/database')

const app = express();
app.use(express.json())
app.set('views',path.join(__dirname,'src/views'))
app.set('view engine','ejs') 

app.use('/checklists',checkListRouter);
app.use('/',rootRouter);

app.listen(8080, () => {
  console.log("Servidor Iniciado");
});

