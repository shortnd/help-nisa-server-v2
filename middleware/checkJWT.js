import dotenv from "dotenv";
import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";

dotenv.config();

const authConfig = {
  domain: `${process.env.AUTH0_DOMAIN}`,
  audience: `${process.env.AUTH0_ISSUER}`
};

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),
  audience: `https://${authConfig.audience}`,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ["RS256"]
});

export default checkJwt
