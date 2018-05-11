'use strict';

const fs = require('fs');

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const debug = require('debug')('slack_zork:server');

const DFrotzInterface = require('frotz-interfacer');

const app = express();

const token = process.env['SLACK_APP_TOKEN'];

app.disable('x-powered-by');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.send('This is the zork server!');
});

app.post('/', (req, res) => {
	debug(req.body);

	/*
	 * data returned by slack
	 * {
	 *  token: "tEE0VQidLc1V6NLoO8EkUY5a",
	 *  team_id: "T0001",
	 *  team_domain: "example",
	 *  channel_id: "C2147483705",
	 *  channel_name: "test",
	 *  timestamp: "1355517523.000005",
	 *  user_id: "U2147483697",
	 *  user_name: "Steve",
	 *  text: googlebot: "What is the air-speed velocity of an unladen swallow?",
	 *  trigger_word: "googlebot:"
	 * }
	 */

	if (token !== req.body.token) {
		res.status(401).send('Invalid token');
	} else {
		const frotz = new DFrotzInterface({
		  saveFile: 'zork.sav'
		});

		let text = req.body.text.split(':')[1].trim();

		frotz.iteration(text, (err, op) => {
			debug(err, op);

			if (err.error || err.stderr) {
				res.send(err);
			} else {
				res.send({
					text: op.pretty.join('\n')
				});
			}
		});
	}

});

// catch 404 and forward to error handler
app.use((req, res, next) => {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use((err, req, res) => {
		res.status(err.status || 500);
		res.send({
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
	res.status(err.status || 500);
	res.send({
		message: err.message,
		error: {}
	});
});

module.exports = app;
