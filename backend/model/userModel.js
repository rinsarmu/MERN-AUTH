import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name should be provided"],
    },
    email: {
      type: String,
      required: [true, "Email should be provided"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password should be provided"],
    },
  },
  {
    timestamps: true,
  }
);

//Hashing password before saving to db
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
