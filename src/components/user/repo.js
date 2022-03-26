import crypto from "crypto";
import {UserModel} from "./model";
import {v4 as uuidv4} from 'uuid';
import axios from "axios";
import {LikeOrPassModel} from "../likeOrPass/model";
import {MatchesModel} from "../matches/model";

export class UserRepo {
    constructor() {
        this.model = UserModel;
        this.likeOrPassModel = LikeOrPassModel;
        this.matchesModel = MatchesModel;
    }

    findAllUser() {
        return this.model.find({});
    }

    findOneByUuid(uuid) {
        return this.model.findOne({uuid});
    }

    findRandomUser() {
        return this.model.aggregate([
            {
                $sample: {size: 1}
            }
        ])
    }

    async findExceptLikedOrPassed(current_user) {
        const exceptUser = await this.likeOrPassModel.find({
            user_uuid: current_user,
        }, {
            target_uuid: 1,
            _id: 0,
        });
        const matchesUser = await this.matchesModel.find({
            user_uuid: current_user,
        }, {
            _id: 0,
            match_uuid: 1,
        });
        const exceptUuid = exceptUser.map(except => except.target_uuid).concat(matchesUser.map(user => user.match_uuid));
        exceptUuid.push(current_user);

        return this.model.find({
            uuid: {
               "$nin": exceptUuid,
            }
        });
    }

    async importFakeData() {
        try {
            const res = await axios.get(`https://dummyapi.io/data/v1/user?limit=20`, {
                headers: {
                    'app-id': '623da72da20f9c28603028df',
                }
            })
            res.data.data.map(async user => {
                let userInfo = await axios.get(`https://dummyapi.io/data/v1/user/${user.id}`, {
                    headers: {
                        'app-id': '623da72da20f9c28603028df',
                    }
                });
                userInfo = userInfo.data;
                const age = this._calculateAge(new Date(userInfo.dateOfBirth));
                const gender = this._getGender(userInfo.title);
                const name = userInfo.firstName + ' ' + userInfo.lastName;
                const token = crypto.randomBytes(20).toString('hex');
                const picture = userInfo.picture;
                const uuid = uuidv4().toString();
                this.model.create({name, age, token, uuid, picture, gender});
            })
        } catch (err) {
            console.log("===", err)
        }
    }

    _calculateAge(birthday) {
        const ageDifMs = Date.now() - birthday.getTime();
        const ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    _getGender(type) {
        switch (type) {
            case 'mr':
                return 'male';
            case 'miss':
            case 'ms':
            case 'mrs':
                return 'female';
        }
    }
}
