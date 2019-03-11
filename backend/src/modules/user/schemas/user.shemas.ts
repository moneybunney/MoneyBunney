import * as mangoose from 'mongoose';

export const UserSchema = new mangoose.Schema({
    username: String,
    password: String,
});