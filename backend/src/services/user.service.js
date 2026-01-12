import User from "../models/user.model.js";

export const getAll = () => User.find().select('-password');

export const getById = (id) => User.findById(id).select('-password');

export const findUserByUsername = (username) => {
    return User.findOne({ username });
}

export const create = (data) => {
  const user = new User(data);
  return user.save();
};

export const findUserById = (id) => {
    return User.findById(id);
}

export const update = (id, data) => {
  return User.findByIdAndUpdate(id, data, { new: true });
}

export const remove = (id) => {
  return User.findByIdAndDelete(id);
}