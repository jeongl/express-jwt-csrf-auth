let Tokens = require('csrf');
let jwt = require('jwt-simple');
let moment = require('moment');

let tokens = new Tokens();

exports.generateToken = (req, res) => {
  console.log(`issuing token: `);
  tokens.secret(function(err, csrfToken){
    if (err) throw err;

    req.user = {};
    req.user.csrfToken = csrfToken;
    req.user.token = jwt.encode({
      iss: 'Jeong',
      exp: moment().add('seconds', 60).valueOf(),
      csrfToken: csrfToken
    }, process.env.jwtSecret );

    exports.setCookies(req, res);
  });

}

exports.setCookies = (req, res) => {
  res.cookie('csrf_token_my_site', req.user.csrfToken, {  maxAge: 50000  });
  res.cookie('token', req.user.token, { maxAge: 50000 });

  res.send(200);
}