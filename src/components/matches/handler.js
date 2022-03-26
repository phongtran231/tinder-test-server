import {MatchesService} from "./service";

export class MatchesHandler {
    constructor() {
        this.service = new MatchesService;
    }

    async fetchMatchesUser(req, res) {
        const { user_uuid } = req.params;
        const data = await this.service.getMatchesUser(user_uuid);
        res.status(200).json(data);
    }
}
