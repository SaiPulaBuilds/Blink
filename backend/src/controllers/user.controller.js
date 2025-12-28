import httpStatus from "http-status";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { Meeting } from "../models/meeting.model.js";

/* =========================
   LOGIN
========================= */
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: "Please provide username and password",
    });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "User not found",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        message: "Invalid username or password",
      });
    }

    const token = crypto.randomBytes(20).toString("hex");
    user.token = token;
    await user.save();

    return res.status(httpStatus.OK).json({ token });
  } catch (e) {
    console.error(e);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong",
    });
  }
};

/* =========================
   REGISTER
========================= */
const register = async (req, res) => {
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: "All fields are required",
    });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(httpStatus.CONFLICT).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(httpStatus.CREATED).json({
      message: "User registered successfully",
    });
  } catch (e) {
    console.error(e);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong",
    });
  }
};

/* =========================
   GET USER HISTORY
   ⚠️ ALWAYS RETURNS ARRAY
========================= */
const getUserHistory = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(httpStatus.UNAUTHORIZED).json([]); // ✅ array
    }

    const user = await User.findOne({ token });
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json([]); // ✅ array
    }

    const meetings = await Meeting.find({
      user_id: user.username,
    }).sort({ date: -1 });

    return res.status(httpStatus.OK).json(meetings); // ✅ array
  } catch (e) {
    console.error(e);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json([]); // ✅ array
  }
};

/* =========================
   ADD TO HISTORY
========================= */
const addToHistory = async (req, res) => {
  try {
    const { token, meeting_code } = req.body;

    if (!token || !meeting_code) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: "Token and meeting code required",
      });
    }

    const user = await User.findOne({ token });
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Invalid token",
      });
    }

    const newMeeting = new Meeting({
      user_id: user.username,
      meetingCode: meeting_code,
    });

    await newMeeting.save();

    return res.status(httpStatus.CREATED).json({
      message: "Added code to history",
    });
  } catch (e) {
    console.error(e);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong",
    });
  }
};

export { login, register, getUserHistory, addToHistory };
