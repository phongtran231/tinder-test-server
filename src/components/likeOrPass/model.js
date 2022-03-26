import mongoose from "mongoose";

export const LIKED = 'liked';
export const PASSED = 'passed';

const schema = mongoose.Schema({
    user_uuid: { type: String },
    type: { type: String },
    target_uuid: { type: String },
    created_at: { type: Date },
}, {
    collection: 'like_or_pass',
});

export const LikeOrPassModel = mongoose.model('LikeOrPassModel', schema);
