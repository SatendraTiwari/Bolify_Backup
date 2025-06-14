export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      sameSite: "None",
      secure: true,
      httpOnly: true
    })
    .setHeader('Authorization', `Bearer ${token}`)
    .json({
      success: true,
      message,
      user,
      token,
    })
};

