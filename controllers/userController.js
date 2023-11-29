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
export const createUser = async (req, res, next) => {
  const userData = req.body;

  try {
    const newUser = await UserModel.create(userData);
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    next(error);
  }
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
