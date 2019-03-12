import * as mongoose from 'mongoose';
import * as crypto from 'crypto';

export const UserSchema = new mongoose.Schema({
    email: String,
    password: {type: String, set: password => crypto.createHmac('sha256', password).digest('hex')},
});
