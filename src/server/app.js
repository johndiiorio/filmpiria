const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const rateLimit = require("express-rate-limit");
const routes = require('./routes');

const app = express();

app.enable('trust proxy');

const uploadLimiter = rateLimit({
	windowMs: 5 * 60 * 1000,
	max: 5,
});
const findLimiter = rateLimit({
	windowMs: 60 * 1000,
	max: 20,
});

app.use('/api/upload', uploadLimiter);
app.use('/api/find', findLimiter);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', '..', 'build')));

app.use('/api', routes);
app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, '..', '..', 'build', 'index.html'));
});

const port = 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
