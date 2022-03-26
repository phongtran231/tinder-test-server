import {LikeOrPassService} from "./service";

export class LikeOrPassHandler {
    constructor() {
        this.service = new LikeOrPassService;
    }

    async getAllLikeUser(req, res) {
        const { user_uuid } = req.params;
        const data = await this.service.getUserLiked(user_uuid);
        res.status(200).json(data);
    }

    async getAllPassUser(req, res) {
        const { user_uuid } = req.params;
        const data = await this.service.getUserPassed(user_uuid);
        res.status(200).json(data);
    }

    async likeSomeOne(req, res) {
        const { user_uuid, target_uuid } = req.body;
        const data = await this.service.likeSomeOne(user_uuid, target_uuid);
        res.status(200).json(data);
    }

    async passSomeOne(req, res) {
        const { user_uuid, target_uuid } = req.body;
        const data = await this.service.passSomeOne(user_uuid, target_uuid);
        res.status(200).json(data);
    }
}
