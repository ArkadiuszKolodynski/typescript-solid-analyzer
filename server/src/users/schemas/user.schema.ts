import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  login: { type: String, required: true, unique: true },
  repositories: { type: Array, default: [] },
});
