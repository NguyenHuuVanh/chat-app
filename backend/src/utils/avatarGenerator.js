import dotenv from "dotenv";
dotenv.config();

export const generateRandomAvatar = () => {
  const index = Math.floor(Math.random() * 100) + 1; // generate a random number between 1-100
  return `${process.env.IMAGE_AVATAR_API}${index}.png`;
};
