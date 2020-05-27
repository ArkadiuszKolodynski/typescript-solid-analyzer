import * as mongoose from 'mongoose';

export const PluginSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  main: { type: String, required: true, unique: true },
  is_enabled: { type: Boolean, default: false },
  version: { type: String, required: true },
});
