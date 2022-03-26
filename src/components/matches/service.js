import {MatchesRepo} from "./repo";

export class MatchesService {
    constructor() {
        this.repo = new MatchesRepo();
    }

    getMatchesUser(current_user) {
        return this.repo.getUserMatched(current_user);
    }
}
