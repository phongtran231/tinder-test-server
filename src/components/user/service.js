import {UserRepo} from "./repo";

export class UserService {
    constructor() {
        this.repo = new UserRepo();
    }

    getAllUser() {
        return this.repo.findAllUser();
    }

    getCurrentUserByUuid(uuid) {
        return this.repo.findOneByUuid(uuid);
    }

    generateFakeUser() {
        return this.repo.importFakeData();
    }

    getRandomUser() {
        return this.repo.findRandomUser();
    }

    getUserExceptLikedOrPassed(current_user) {
        return this.repo.findExceptLikedOrPassed(current_user);
    }
}
