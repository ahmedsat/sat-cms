import jwt from "jsonwebtoken";

export const CreateJWT = (user) => {
  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "8h",
    }
  );
  return token;
};

export const VerifyJWT = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return { error: error.message };
  }
};
