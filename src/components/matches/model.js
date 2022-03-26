import mongoose from "mongoose";

const schema = mongoose.Schema({
    user_uuid: { type: String },
    match_uuid: { type: String },
}, {
    collection: 'matches',
});

export const MatchesModel = mongoose.model('MatchesModel', schema);
