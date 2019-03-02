import * as mangoose from 'mongoose';

export const UsersSchema = new mangoose.Schema({
    Username: String,
    Password: String,
});