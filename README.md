# passport-ivao

[Passport](https://www.passportjs.org/) strategy for authenticating
with IVAO login.

This module is a modification of [passport-openidconnect](https://github.com/jaredhanson/passport-openidconnect). It lets you authenticate using IVAO login in your Node.js
applications.  By plugging into Passport, OpenID Connect-based sign in can be
easily and unobtrusively integrated into any application or framework that
supports [Connect](https://github.com/senchalabs/connect#readme)-style
middleware, including [Express](https://expressjs.com/).

## Install

```sh
$ npm install passport-ivao
```

## Usage

#### Configure Strategy

The OpenID Connect authentication strategy authenticates users using their
account at an OpenID Provider (OP).  The strategy needs to be configured with
the provider's endpoints, as well as a client ID and secret that has been issued
by the provider to the app.  Consult the provider's documentation for the
locations of these endpoints and instructions on how to register a client.

The strategy takes a `verify` function as an argument, which accepts `issuer`
and `profile` as arguments.  `issuer` is set to an identifier for the OP.
`profile` contains the user's [profile information](https://www.passportjs.org/reference/normalized-profile/)
stored in their account at the OP.  When authenticating a user, this strategy
uses the OpenID Connect protocol to obtain this information via a sequence of
redirects and back-channel HTTP requests to the OP.

The `verify` function is responsible for determining the user to which the
account at the OP belongs.  In cases where the account is logging in for the
first time, a new user record is typically created automatically.  On subsequent
logins, the existing user record will be found via its relation to the OP
account.

Because the `verify` function is supplied by the application, the app is free to
use any database of its choosing.  The example below illustrates usage of a SQL
database.

```js
var OpenIDConnectStrategy = require('passport-ivao');

passport.use(new OpenIDConnectStrategy({
    clientID: process.env['CLIENT_ID'],
    clientSecret: process.env['CLIENT_SECRET'],
    callbackURL: 'https://client.example.org/cb'
  },
  function verify(
                  issuer,
                  uiProfile,
                  idProfile,
                  context,
                  idToken,
                  accessToken,
                  refreshToken,
                  params,
                  verified) {
    // TODO: Implement user lookup logic
  }
));
```

#### Define Routes

Two routes are needed in order to allow users to log in with their account at an
OP.  The first route redirects the user to the OP, where they will authenticate:

```js
app.get('/login', passport.authenticate('openidconnect'));
```

The second route processes the authentication response and logs the user in,
when the OP redirects the user back to the app:

```js
app.get('/cb',
  passport.authenticate('openidconnect', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    res.redirect('/');
  });
```

## Examples

* [todos-express-openidconnect](https://github.com/passport/todos-express-openidconnect)

  Illustrates how to use the OpenID Connect strategy within an Express
  application.

* [todos-express-auth0](https://github.com/passport/todos-express-auth0)

  Illustrates how to use the OpenID Connect strategy to integrate with [Auth0](https://auth0.com/)
  in an Express application.  For developers new to Passport and getting
  started, a [tutorial](https://www.passportjs.org/tutorials/auth0/) is
  available.

## Credits
Jared Hanson <[@jaredhanson](https://github.com/jaredhanson)>: for the original OpenID Connect implementation

## License

[The MIT License](https://opensource.org/licenses/MIT)