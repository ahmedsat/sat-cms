import { Schema, model } from "mongoose";
import { hashPassword } from "../utils/password.js";
import jwt from "jsonwebtoken";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      default: "User",
      minlength: 4,
      maxlength: 50,
    },
    username: {
      type: String,
      required: [true, "Missing username field"],
      minlength: 3,
      maxlength: 255,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Missing email field"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Invalid email format",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Missing password field"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: [
        "root",
        "manager",
        "admin",
        "editor",
        "super-visor",
        "publisher",
        "client",
        "guest",
      ],
      default: "guest",
    },
    //   loginExpires: {
    //     type: String,
    //     default: "1h",
    //     match: [/^[0-9]+[dhms]$/, "Login expires must be a valid duration"],
    //   },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  this.password = await hashPassword(this.password);
});

UserSchema.methods.CreateJWT = function () {
  const token = jwt.sign(
    { id: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: "8h",
    }
  );
  return token;
};

export const User = model("User", UserSchema);
