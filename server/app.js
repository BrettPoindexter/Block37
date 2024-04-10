const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '...', 'client/dist')));

app.use((req, res, next) => {
    const auth = req.headers.authorization;
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;

    try {
        req.user = jwt.verify(token, process.env.JWT);
    } catch {
        req.user = null;
    }

    next();
});

//app.use('/auth', require('./auth'));
//app.use('/api', require('./api'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '...', 'client/dist/index.html'));
});

app.use((err, req, res, next) => {
    console.err(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error');
});

app.use((req, res) => {
    res.status(404).send('Not Found');
});

module.exports = app;