const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const find = require('./routes/find');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', '..', 'build')));

app.use('/api/find', find);
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '..', '..', 'build', 'index.html'));
});

const port = 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
