### express-jwt-csrf-auth

This application example demonstrates an authentication strategy using jwt tokens as well as a csrf token.  Popular client side validations tend to store the token client side, which is susceptible to XSS attacks.

The goal of this auth is to implement strategies that i've researched that combat both csrf and XSS (well, better at least).

###### Features / auth overview
- Two cookies are set in the browser (csrf token and the jwt token).

- The generated jwt token is sent as a read only http cookie to the browser.
	- This cookie will contain a csrf token as well as an expiration timestamp.
	- Each request will parse the csrf token cookie and send the request csrf token (as a header) with the jwt token.

		_The validation will be to decode the auth header and compare it to the original csrf token that was generated. The token is passed along as part of the request._


###### Refresh token
- The tokens have an expire time that is set in enviroment variables.

- Env variable that sets the time limit for a given token ```process.env.timeInSecs```

- Env variables that sets the token refresh window ```process.env.refreshMinSecs process.env.refreshMaxSecs```