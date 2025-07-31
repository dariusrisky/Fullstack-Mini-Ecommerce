const { prisma } = require("./utils/prismaClient");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("./utils/jwt");

const defaultProfile =
  "http://localhost:3000/image/default/default_profile.jpeg";

const registerAccount = async (req, res) => {
  const { email, name, password, password_confirm, role } = req.body;
  if (!email || !name || !password || !password_confirm) {
    return res.status(400).json({ msg: "All fields are required." });
  }
  if (password !== password_confirm)
    return res.status(400).json({ msg: "Passwords do not match." });
  if (password.length < 6)
    return res
      .status(400)
      .json({ msg: "Password must be at least 6 characters long." });

  const existingUser = await prisma.user.findUnique({
    where: { email: email },
  });
  if (existingUser) {
    return res.status(400).json({ msg: "Email already exists." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: hashedPassword,
        profileImageURL: defaultProfile,
        role: role || "USER",
      },
    });

    const cart = await prisma.cart.create({
      data: {
        userId: user.id,
      },
    });

    if (!cart) return res.status(401).json({ msg: "ada error nich" });

    res.status(201).json({
      msg: "User created successfully.",
      user: user,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the user." });
  }
};

const loginAccount = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password are required." });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Invalid password." });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await prisma.user.update({
      where: { id: user.id },
      data: { SESION_TOKEN: refreshToken },
    });

    res.cookie("refreshToken", refreshToken, {
      // httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.header("Authorization", `Bearer ${accessToken}`);

    return res.status(200).json({
      msg: "Login successful.",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.profileImagePath,
        url: user.profileImageURL,
        accessToken: accessToken,
      },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "An error occurred while logging in." });
  }
};

const logoutAccount = async (req, res) => {
  try {
    const cookie = req.cookies;
    const refreshToken = cookie?.refreshToken;

    if (!cookie) return res.sendStatus(401);
    if (!refreshToken) return res.sendStatus(402);
    const user = await prisma.user.findUnique({
      where: { SESION_TOKEN: refreshToken },
    });

    if (!user) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });
      return res.sendStatus(207);
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { SESION_TOKEN: null },
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });

    return res.status(200).json({ msg: "Logout successful." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

const getNewAccessToken = async (req, res) => {
  const cookie = req.cookies;
  const refreshToken = cookie?.refreshToken;

  if (!cookie) return res.sendStatus(401);
  if (!refreshToken) return res.sendStatus(402);

  try {
    const user = await prisma.user.findUnique({
      where: { SESION_TOKEN: refreshToken },
    });

    if (!user) return res.sendStatus(403);

    const newAccessToken = generateAccessToken(user);
    return res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("Error generating new access token:", error);
    return res.status(500).json({ msg: "Internal server error." });
  }
};

const editProfileUser = (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });

  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/image/user/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });

  file.mv(`./public/image/user/${fileName}`, async err => {
    if (err) return res.status(500).json({ msg: err.message });

    try {
      const { password, password_confirm } = req.body;
      if (!password || !password_confirm)
        return res.status(400).json({ msg: "Semua kolom wajib di isi" });
      if (password != password_confirm)
        return res.status(402).json({ msg: "password harus sama." });

      const hashedPassword = await bcrypt.hash(password, 10);

      const editProfileUser = await prisma.user.update({
        where: { id: req.user.id },
        data: {
          name: req.body.name,
          password: hashedPassword,
          profileImagePath: fileName,
          profileImageURL: url,
        },
      });
      return res.status(200).json({
        msg: "berhasil mengubah profile.",
        data: editProfileUser,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internal server error." });
    }
  });
};

module.exports = {
  registerAccount,
  loginAccount,
  logoutAccount,
  editProfileUser,
  getNewAccessToken,
};
