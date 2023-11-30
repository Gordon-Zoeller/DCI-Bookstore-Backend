import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from '../models/userSchema.js';

// Function to get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

// Function to get a specific user by ID
export const getUserById = async (req, res, next) => {
  const userId = req.params.id;

  try {
    // import { createUser, getAllUsers, getUserById } from "./controllers/userController.js";
    const user = await UserModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// Function to create a new user
export const register = async (req, res, next) => {
  const userData = req.body;
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await UserModel.create({...userData, password: hashPassword});
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({email: req.body.email.toLowerCase()});
    if(user) {
      const checkPassword = await bcrypt.compare(req.body.password, user.password);
      if(checkPassword) {
        const token = jwt.sign({_id: user._id, email: user.email}, process.env.SECRET_KEY, {issuer: "Peter Lake", expiresIn: "24h"});
        res.header("token", token).json({success: true, data: user});
      } else {
        res.json({success: false, message: "Please make sure your password is correct."});
      };
    } else {
      res.json({success: false, message: "Please make sure your email is correct."});
    };
  } catch (error) {
    next(error);
  };
};

// Function to update a user by ID
export const updateUserById = async (req, res, next) => {
  const userId = req.params.id;
  const updatedUserData = req.body;

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      updatedUserData,
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    next(error);
  }
};

// Function to delete a user by ID
export const deleteUserById = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const deletedUser = await UserModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    res
      .status(200)
      .json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTY4NjM0NDllNDgxMjJlOGFhYmViNzgiLCJlbWFpbCI6ImFyaWFuZS5oaXJ0aGUzNkBob3RtYWlsLmNvbSIsImlhdCI6MTcwMTMzOTk5MiwiZXhwIjoxNzAxMzM5OTkyLCJpc3MiOiJQZXRlciBMYWtlIn0.Ibi3JpAIyr-o_7i7w7dGcPHue1UsF9qcjv182vjsEAc
