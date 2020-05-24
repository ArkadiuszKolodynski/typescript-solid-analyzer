import { Document } from 'mongoose';

export interface User extends Document {
  login: string;
  repositories: any[];
}
