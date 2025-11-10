import dotenv from "dotenv";
import User from "../models/User.js";
import { upsertStreamUser } from "../lib/stream.js";
import { validateEmail, validateFullName, validateOnboardingData, validatePassword } from "../utils/validation.js";
import { generateRandomAvatar } from "../utils/avatarGenerator.js";
dotenv.config();

export const createNewUser = async (email, password, fullName) => {
  // validation
  if (!email || !password || !fullName) {
    throw new Error("MISSING_FIELDS");
  }

  if (!validateEmail(email)) {
    throw new Error("INVALID_EMAIL_FORMAT");
  }

  if (!validatePassword(password)) {
    throw new Error("PASSWORD_TOO_SHORT");
  }

  if (!validateFullName(fullName)) {
    throw new Error("INVALID_FULLNAME");
  }

  // check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("EMAIL_ALREADY_EXISTS");
  }

  // create user
  const newUser = await User.create({
    email,
    password,
    fullName,
    profilePicture: generateRandomAvatar(),
    isOnboarded: false,
  });

  // create stream user
  try {
    await upsertStreamUser({
      id: newUser._id.toString(),
      name: newUser.fullName,
      image: newUser.profilePicture || "",
    });
    console.log(`Stream user created for ${newUser.fullName}`);
  } catch (error) {
    console.log("Error creating Stream user:", error.message);
  }

  //   const token = createToken(newUser._id);
  //   createCookie(res, token);

  return newUser;
};

export const authenticateUser = async (email, password) => {
  //validation
  if (!email || !password) {
    throw new Error("MISSING_CREDENTIALS");
  }

  // find user
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("INVALID_EMAIL");
  }

  // check password
  const isPasswordCorrect = await User.matchPassword(password);
  if (!isPasswordCorrect) {
    throw new Error("INVALID_PASSWORD");
  }

  return user;
};

export const onBoarUser = async (userId, onBoardingData) => {
  // validation
  const validation = validateOnboardingData(onBoardingData);
  if (!validation.isValid) {
    const error = new Error("MISSING_FIELDS");
    error.missingFields = validation.missingFields;
    throw error;
  }

  // update user
  const updatedUser = await User.findByIdAndUpdate(userId, { ...onBoardingData, isOnboarded: true }, { new: true });

  if (!updatedUser) {
    throw new Error("USER_NOT_FOUND");
  }

  // update stream user
  try {
    await upsertStreamUser({
      id: updatedUser._id.toString(),
      name: updatedUser.fullName,
      image: updatedUser.profilePicture || "",
    });
    console.log(`Stream user updated after onboarding for ${updatedUser.fullName}`);
  } catch (error) {
    console.log("Error updating Stream user:", error.message);
  }

  return updatedUser;
};
