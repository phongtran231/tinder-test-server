import {LikeOrPassRepo} from "./repo";

export class LikeOrPassService {
    constructor() {
        this.repo = new LikeOrPassRepo;
    }

    getUserLiked(current_user) {
        return this.repo.getAllLikeByUser(current_user);
    }

    getUserPassed(current_user) {
        return this.repo.getAllPassedByUser(current_user);
    }

    likeSomeOne(current_user, target_user) {
        return this.repo.likeSomeOne(current_user, target_user);
    }

    async passSomeOne(current_user, target_user) {
        const result = await this.repo.passSomeOne(current_user, target_user);
        if (result) {
            return {
                'is_target_liked': false,
            };
        }
        return {
            'is_target_liked': true,
        }
    }
}
