import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema(
  {
    avatar: {
      type: String,
      default: "https://ik.imagekit.io/d05hbimvo/user-profile-icon-vector-avatar-600nw-2558760599.webp?updatedAt=1779732401707"
    },

    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    email: {
      type: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },

      name: {
        type: String,
        required: true,
      },

      password: {
        type: String,
        required: true,
      },

      emailVerificationToken: String,

      emailVerificationExpiry: Date,

      forgotPasswordToken: String,

      forgotPasswordExpiry: String,

      refreshToken: String,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = function(password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.getAccessToken = function() {
    return jwt.sign({_id: this._id}, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_EXPIRY)
}

userSchema.methods.getRefreshToken = function() {
    return jwt.sign({_id: this._id}, process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_EXPIRY)
}
 
const User = mongoose.model("User", userSchema);

export default User;
