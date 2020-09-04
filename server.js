import express from 'express';

import indexRouter from './routes/index.js';

const app = express();

app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

app.listen(3000);

// app.listen(process.env.PORT);
