import {MatchesModel} from "./model";
import {UserModel} from "../user/model";

export class MatchesRepo {
    constructor() {
        this.model = MatchesModel;
        this.userModel = UserModel;
    }

    async getUserMatched(current_user) {
        console.log(current_user)
        const userMatched = await this.model.find({user_uuid: current_user}, {_id: 0, match_uuid: 1});
        return this.userModel.find({
            uuid: {
                '$in': userMatched.map(user => user.match_uuid),
            }
        })
    }
}
