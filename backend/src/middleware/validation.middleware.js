import User from "../models/User.js";

export const validateSignup = async (req, res, next) => {
  const { email, password, fullName } = req.body;

  if (!email.trim() || !password.trim() || !fullName.trim()) {
    return res.json({
      status: 400,
      message: "Full name, email, and password are required.",
    });
  }

  if (password.length < 6) {
    return res.json({
      status: 400,
      message: "Password must be at least 6 characters",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.json({
      status: 400,
      message: "Invalid email format",
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.json({
      status: 400,
      message: "Email already exists, please use a different one",
    });
  }
  next();
};

export const validateSignin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      status: 400,
      message: "Please fill all fields",
    });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({
      status: 401,
      message: "Invalid email",
    });
  }

  const isPasswordCorrect = await user.matchPassword(password);
  if (!isPasswordCorrect) return res.json({ status: 401, message: "Invalid password" });
  next();
};
