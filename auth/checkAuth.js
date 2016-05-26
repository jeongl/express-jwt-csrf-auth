let Tokens = require('csrf');
let jwt = require('jwt-simple');
let login = require('../routes/login.js');
let allowAuth = require('./allowAuth.js');
let moment = require('moment');
let {  jwtSecret,  timeInSecs,  refreshMinSecs,  refreshMaxSecs } = process.env;

exports.checkAuthFirst = () => {
  return (req, res, next) => {
    if (req.get('x-csrf-token')){
      try{
        req.decodedToken = jwt.decode(req.cookies.token, jwtSecret);
        if (req.get('x-csrf-token') === req.decodedToken.csrfToken){
          next();

        } else {
          return res.send(401, `Your x-csrf-token header does not match what
            was originally generated with your jwt.`);
        }
      } catch (err) {
        return res.send(401, `Decoding against secret failed: `);
      }
    } else {
      return res.send(401, `No x-csrf-token header.`);
    }
  }
}

exports.checkExpired = (req, res, next) => {
  var timeDiff = moment(moment().diff(req.decodedToken.exp)).format('ss');
  console.log('timeDiff: ', timeDiff );

  if ( timeDiff >= timeInSecs ){
    res.clearCookie('csrf_token_my_site');
    res.clearCookie('token');
    return res.send(401, 'Token expired');

  } else if ( timeDiff >= Number(refreshMinSecs) && timeDiff <= Number(refreshMaxSecs) ){
    console.log('issuing refresh token: ');
    next();

  } else {
    return res.send(200);
  }
}

exports.reGenerateToken = (req, res) => allowAuth.generateToken(req, res);