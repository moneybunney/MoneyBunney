import * as mangoose from 'mongoose';

export const UserSchema = new mangoose.Schema({
    Username: String,
    Password: String,
    Token: String,
});