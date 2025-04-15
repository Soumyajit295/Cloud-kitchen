const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const cookieOption = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Strict",
};

const register = async (req, res) => {
  const { name, email, password, contactNumber } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already registered",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name: name,
      password: hashedPassword,
      email: email,
      contactNumber: contactNumber,
    });
    if (!newUser) {
      return res.status(400).json({
        success: false,
        message: "Unable to fail register",
      });
    }
    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: `Something went wrong while register user ${err.message}`,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not registered",
      });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({
        success: false,
        message: "Wrong password",
      });
    }
    const authToken = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        role: user.role,
        address : user.address,
        selectedAddress : user.selectedAddress
      },
      process.env.jwt_secret,
      {
        expiresIn: "4h",
      }
    );
    const loggedInUser = await User.findOne({ email: user.email })
      .select("-password")
      .populate("address")
      .populate("selectedAddress");

    if (!loggedInUser) {
      return res.status(400).json({
        success: false,
        message: "Failed to login",
      });
    }
    res.cookie("authToken", authToken, cookieOption);
    return res.status(200).json({
      success: true,
      message: "Loggedin successfull",
      data: loggedInUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Something went wrong while login ${err.message}`,
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("authToken", cookieOption);
    return res.status(200).json({
      success: true,
      message: "User logged out",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to logout",
    });
  }
};

const getMyOrders = async (req, res) => {
  const { _id } = req.user;
  try {
    const user = await User.findById(_id).populate({
      path: "orders",
      populate: {
        path: "orderItems.food",
        select: "name",
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Account not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: user.orders,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong during fetching orders",
    });
  }
};

module.exports = {
  register,
  login,
  logout,
  getMyOrders,
};
