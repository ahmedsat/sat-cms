import gwt from "jsonwebtoken";

export const CreateJWT = (user) => {
  const token = gwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "8h",
    }
  );
  return token;
};

export const VerifyJWT = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
