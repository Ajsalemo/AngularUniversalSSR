const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

export const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.AUTH0_JWKS_URI
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: [`${process.env.AUTH0_DOMAIN}`],
  algorithms: [`${process.env.AUTH0_ALGORITHMS}`]
});