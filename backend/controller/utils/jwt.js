const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
  return jwt.sign({ userId: user.id }, process.env.ACCESSTOKEN_SECRET_KEY, {
    expiresIn: "5m",
  });
}

function generateRefreshToken(user) {
  return jwt.sign({ userId: user.id }, process.env.REFRESHTOKEN_SECRET_KEY, {
    expiresIn: "7d",
  });
}

function generateTokens(user) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken();
  return { accessToken, refreshToken };
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateTokens,
};
