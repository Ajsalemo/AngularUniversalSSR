const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const { environment } = require('../src/environments/environment.prod');

export const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: environment.AUTH0_JWKS_URI,
  }),
  // Validate the audience and the issuer.
  audience: environment.AUTH0_AUDIENCE,
  issuer: [`https://${environment.AUTH0_DOMAIN}/`],
  algorithms: [`${environment.AUTH0_ALGORITHMS}`],
});
