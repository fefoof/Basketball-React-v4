require('@babel/register')({
  ignore: ['node_modules'],
});

const express = require('express');
const config = require('./config');
const apiRouter = require('./api');
const appRouter = require('./app');
const bodyParser = require('body-parser');

const session = require('express-session');


const app = express();

// Configuraciones de express
app.set('view engine', 'ejs');
app.set('views', __dirname + '/app/views');


app.use(session({
  secret: 'my secret',
  cookie: {maxAge: 43200000},
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(express.static(config.static));
app.use('/images',   express.static(config.staticiamge));

// Asignar middlewares globales
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', apiRouter);
app.use(appRouter);

app.listen(config.PORT, () => {
    console.log('Aplicación levantanda')
});
