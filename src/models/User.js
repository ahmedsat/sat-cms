import { Schema, model } from "mongoose";
import { hashPassword } from "../utils/password.js";
import jwt from "jsonwebtoken";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Name is required"],
      minlength: 3,
      maxlength: 255,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
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
