import mongoose from 'mongoose';
import {v4 as uuidv4} from "uuid";

const schema = mongoose.Schema({
    uuid: { type: String },
    name: { type: String },
    age: { type: Number },
    token: { type: String },
    picture: { type: String },
    gender: { type: String },
}, {
    collection: 'users',
});

schema.pre('save', (next) => {
    this.uuid = uuidv4().toString();
    next();
});

export const UserModel = mongoose.model('UserModel', schema);
