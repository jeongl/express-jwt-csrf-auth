let jwt = require('jwt-simple');
let moment = require('moment');
let allowAuth = require('../auth/allowAuth.js');
let Tokens = require('csrf');
let tokens = new Tokens();

exports.main = (app) => {
	app.get(`/login`, [exports.checkPassWord, exports.generateToken]);
}

exports.checkPassWord = (req, res, next) => {

	let passWordChecked = true;

	if ( passWordChecked ){
		next();
	}
}


exports.generateToken = (req, res) => allowAuth.generateToken(req, res);