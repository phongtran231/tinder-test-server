import {UserHandler} from "./components/user/handler";
import {LikeOrPassHandler} from "./components/likeOrPass/handler";
import {MatchesHandler} from "./components/matches/handler";

export default app => {
    const userHandler = new UserHandler;
    app.get('/user', userHandler.fetchAllUser.bind(userHandler));
    app.get('/user/:uuid', userHandler.fetchUserByUuid.bind(userHandler));
    app.get('/user/random/get-random-user', userHandler.fetchRandomUser.bind(userHandler));
    app.post('/user/faker/generate', userHandler.generateFakeUser.bind(userHandler));
    app.get('/user/get-except/liked-or-passed/:current_user', userHandler.fetchUserExceptLikedOrPassed.bind(userHandler));

    const likeOrPassHandler = new LikeOrPassHandler;
    app.post('/user-action/like', likeOrPassHandler.likeSomeOne.bind(likeOrPassHandler));
    app.post('/user-action/pass', likeOrPassHandler.passSomeOne.bind(likeOrPassHandler));
    app.get('/user-action/liked/get-user-liked/:user_uuid', likeOrPassHandler.getAllLikeUser.bind(likeOrPassHandler));
    app.get('/user-action/passed/get-user-passed/:user_uuid', likeOrPassHandler.getAllPassUser.bind(likeOrPassHandler));

    const matchesHandler = new MatchesHandler;
    app.get('/matches/get-matches-user/:user_uuid', matchesHandler.fetchMatchesUser.bind(matchesHandler));
}
