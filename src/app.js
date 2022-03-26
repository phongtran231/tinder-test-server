import express from 'express';
import cors from 'cors';
import config from './config';
import routes from "./routes";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(cors());

routes(app);

app.listen(config.server.port, () => {
    const connection = config.server.db_url;
    mongoose.connect(connection, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    mongoose.connection.once('open', () => {
        console.log("db connected....");
    })
    mongoose.set("debug", (collectionName, method, query, doc) => {
        console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
    });
    console.log('server running on ', config.server.port);
})
