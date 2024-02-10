import jwt from "jsonwebtoken";

const genrateTokenAndCookie = (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res.cookie("jwt", token, {

    maxAge: 7 * 24 * 60 * 60 * 1000, //MS

    // Prevents client side JS from reading the cookie and attacks such as (XSS protection or cross-site scripting or script injection)
    httpOnly: true,

    // Prevent attacks such as (CSRF or Cross-Site Request Forgery)
    sameSite: "strict",

    // secure: true, // Only works on HTTPS
    secure: process.env.NODE_ENV === "production" ? true : false,
  });
};

export default genrateTokenAndCookie;
