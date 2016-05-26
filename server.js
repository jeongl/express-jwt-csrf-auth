const express = require('express');
const app = express();

const cookieParser = require('cookie-parser')
app.use(cookieParser());

let auth = require('./auth/checkAuth');
let authChecks = [auth.checkAuthFirst(), auth.checkExpired,  auth.reGenerateToken];

// Route that is not protected
app.get('/', (req, res) =>  res.send(200) );

// Route that is protected, also issues a refresh after a certain amount of time
// specified from the min and max window time (environment variables).
app.get('/anotherRoute', authChecks, (req,res) => res.send(200) );

// Authentication route that issues a token, and sets a cookie
require('./routes/login').main(app);

app.listen(3000, () => console.info('App listening on port 3000!'));