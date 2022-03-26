import {UserService} from "./service";

export class UserHandler {
    constructor() {
        this.service = new UserService;
    }

    async fetchAllUser(req, res) {
        const data = await this.service.getAllUser();
        res.status(200).json(data)
    }

    async fetchUserByUuid(req, res) {
        const uuid = req.params;
        let user = null;
        if (uuid) {
            user = await this.service.getCurrentUserByUuid(uuid);
        }
        if (!user) {
            res.status(404).json({
                data: null,
            })
        }
        res.status(200).json(user);
    }

    async fetchRandomUser(req, res) {
        const data = await this.service.getRandomUser();
        res.status(200).json(data[0])
    }

    async fetchUserExceptLikedOrPassed(req, res) {
        const { current_user } = req.params;
        const data = await this.service.getUserExceptLikedOrPassed(current_user);
        res.status(200).json(data)
    }

    generateFakeUser(req, res) {
        this.service.generateFakeUser();
        res.status(200).json({
            success: true
        });
    }
}
