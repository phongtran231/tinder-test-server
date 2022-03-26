import {LIKED, LikeOrPassModel, PASSED} from "./model";
import {UserModel} from "../user/model";
import {MatchesModel} from "../matches/model";

export class LikeOrPassRepo {
    constructor() {
        this.model = LikeOrPassModel;
        this.userModel = UserModel;
        this.matchesModel = MatchesModel;
    }

    async getAllLikeByUser(user_uuid) {
        const userLiked = await this.model.find({user_uuid, type: LIKED}, {_id: 0, target_uuid: 1});
        const userLikedUuid = userLiked.map(user => user.target_uuid);
        return this.userModel.find({
            uuid: {
                "$in": userLikedUuid,
            }
        })
    }

    async getAllPassedByUser(user_uuid) {
        const userPassed = await this.model.find({user_uuid, type: PASSED}, {_id: 0, target_uuid: 1});
        const userPassedUuid = userPassed.map(user => user.target_uuid);
        return this.userModel.find({
            uuid: {
                "$in": userPassedUuid,
            }
        })
    }

    async likeSomeOne(user_uuid, target_uuid) {
        const isUserMatch = await this.model.findOne({
            user_uuid: target_uuid,
            target_uuid: user_uuid,
            type: LIKED,
        }, {_id: 0, user_uuid: 1, target_uuid: 1});
        if (isUserMatch) {
            await Promise.all([
                this.matchesModel.create({user_uuid, match_uuid: target_uuid}),
                this.matchesModel.create({user_uuid: target_uuid, match_uuid: user_uuid}),
                this.model.deleteOne({
                    user_uuid: target_uuid,
                    target_uuid: user_uuid,
                }),
            ]);
        } else {
            this.model.create({
                user_uuid,
                target_uuid,
                type: LIKED,
            })
        }
        return true;
    }

    async passSomeOne(user_uuid, target_uuid) {
        const isTargetLiked = await this.model.findOne({
            user_uuid: target_uuid,
            target_uuid: user_uuid,
        }, {_id: 0});
        this.model.create({
            user_uuid,
            target_uuid,
            type: PASSED,
        })
        return !isTargetLiked;

    }
}
