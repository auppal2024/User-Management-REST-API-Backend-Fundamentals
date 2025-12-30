import {
  getAllUsersService,
  getUserByIdService,
  createUserService,
  updateUserService,
  deleteUserService,
} from "../models/userModel.js";

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({ status, message, data });
};

export const createUser = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const newUser = await createUserService({ name, email });
    handleResponse(res, 201, "User created successfully", newUser);
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersService();
    handleResponse(res, 200, "Users retrieved successfully", users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await getUserByIdService(id);
    if (user) {
      handleResponse(res, 200, "User retrieved successfully", user);
    } else {
      handleResponse(res, 404, "User not found");
    }
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const updatedUser = await updateUserService(id, { name, email });
    if (updatedUser) {
      handleResponse(res, 200, "User updated successfully", updatedUser);
    } else {
      handleResponse(res, 404, "User not found");
    }
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedUser = await deleteUserService(id);
    if (deletedUser) {
      handleResponse(res, 200, "User deleted successfully", deletedUser);
    } else {
      handleResponse(res, 404, "User not found");
    }
  } catch (err) {
    next(err);
  }
};