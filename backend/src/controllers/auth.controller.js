import * as authService from "../services/auth.service.js";
import { clearCookieToken, generateToken, setCookieToken } from "../utils/tokenUtils.js";

export const signup = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;
    // create user
    const newUser = await authService.createNewUser(email, password, fullName);
    // create token
    const token = generateToken(newUser._id);
    setCookieToken(res, token);
    // set Header Authorization
    res.setHeader("Authorization", `Bearer ${token}`);

    res.json({
      status: 201,

      success: true,
      message: "User created successfully",
      user: {
        _id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
        profilePicture: newUser.profilePicture,
        isOnboarded: newUser.isOnboarded || false, // Ensure isOnboarded is always a boolean
      },
      token,
    });
  } catch (error) {
    console.log("Error in signup controller:", error.message);
    // Handle specific errors
    const errorMessages = {
      MISSING_FIELDS: "Please fill all fields",
      INVALID_EMAIL: "Invalid email format",
      PASSWORD_TOO_SHORT: "Password must be at least 6 characters",
      INVALID_FULLNAME: "Please provide a valid full name",
      EMAIL_EXISTS: "Email already exists, please use a different one",
    };

    const statusCodes = {
      MISSING_FIELDS: 400,
      INVALID_EMAIL: 400,
      PASSWORD_TOO_SHORT: 400,
      INVALID_FULLNAME: 400,
      EMAIL_EXISTS: 409,
    };

    const message = errorMessages[error.message] || "Internal server error";
    const statusCode = statusCodes[error.message] || 500;

    res.status(statusCode).json({
      success: false,
      message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.authenticateUser(email, password);

    const token = generateToken(user._id);
    setCookieToken(res, token);

    res.setHeader("Authorization", `Bearer ${token}`);
    res.json({
      status: 200,
      success: true,
      message: "User logged in successfully",
      user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        profilePicture: user.profilePicture,
        isOnboarded: user.isOnboarded || false,
      },
      token,
    });
  } catch (error) {
    console.log("Error in login controller:", error.message);
    // Handle specific errors
    const errorMessages = {
      MISSING_CREDENTIALS: "Please fill all fields",
      INVALID_EMAIL: "Invalid email",
      INVALID_PASSWORD: "Invalid password",
    };

    const statusCodes = {
      MISSING_CREDENTIALS: 400,
      INVALID_EMAIL: 401,
      INVALID_PASSWORD: 401,
    };

    const message = errorMessages[error.message] || "Internal server error";
    const statusCode = statusCodes[error.message] || 500;

    res.status(statusCode).json({
      success: false,
      message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    // Xóa cookie jwt
    clearCookieToken(res);

    res.json({
      status: 200,
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.json({
      status: 500,
      success: false,
      message: "Internal server error",
    });
  }
};

export const onboard = async (req, res) => {
  try {
    const userID = req.user._id;
    const onBoardingData = req.body;

    // onBoard user
    const updatedUser = await authService.onBoarUser(userID, onBoardingData);

    if (updatedUser) {
      return res.json({
        status: 200,
        success: true,
        message: "User onboarded successfully",
        user: updatedUser,
      });
    }
  } catch (error) {
    console.log("Error in onboard controller:", error.message);
    if (error.message === "MISSING_FIELDS") {
      return res.json({
        status: 400,
        success: false,
        message: "Please fill all fields",
        missingFields: error.missingFields,
      });
    }

    if (error.message === "USER_NOT_FOUND") {
      return res.json({
        status: 404,
        success: false,
        message: "User not found",
      });
    }

    res.json({
      status: 500,
      success: false,
      message: "Internal server error",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = req.user;

    res.json({
      status: 200,
      success: true,
      user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        profilePicture: user.profilePicture,
        isOnboarded: user.isOnboarded || false,
        bio: user.bio || "",
        location: user.location || "",
        education: user.education || "",
        nativeLanguage: user.nativeLanguage || "",
        learningLanguage: user.learningLanguage || "",
      },
    });
  } catch (error) {
    console.log("Error in getMe controller:", error.message);
    res.json({
      status: 500,
      success: false,
      message: "Internal server error",
    });
  }
};
