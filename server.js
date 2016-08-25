const webpack = require('webpack');
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config');

const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public'));

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/src/index.html');
});

app.listen(port, (error) => {
	if (error) {
		console.error(error);
	} else {
		console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
	}
});
