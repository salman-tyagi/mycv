export enum MongoError {
  Code = 11000,
}

export enum JwtError {
  ExpiredJwt = 'TokenExpiredError',
  InvalidJwt = 'JsonWebTokenError',
}
