import { generateStreamToken } from "../lib/stream.js";

const getSteamToken = async (req, res) => {
  try {
    const token = generateStreamToken(req.user.id);
    res.status(200).json({
      success: true,
      message: "Stream token generated successfully",
      token,
    });
  } catch (error) {
    console.log("Error in getSteamToken controller:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export { getSteamToken };
