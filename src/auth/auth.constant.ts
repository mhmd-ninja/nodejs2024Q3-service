export const jwtConstants = {
  secret: process.env.JWT_SECRET_KEY || 'secretKey111',
  expireIn: process.env.TOKEN_EXPIRE_TIME || '1h',
};
