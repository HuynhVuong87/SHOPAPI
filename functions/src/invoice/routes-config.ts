import { all } from "./controller";
import { isAuthenticated } from "../auth/authenticated";
import { isAuthorized } from "../auth/authorized";
import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

export function invoice() {
    const app = express();
    const main = express();
    main.use('/invoice', app);
    main.use(bodyParser.json());
    main.use(bodyParser.urlencoded({ extended: false }));
    app.use(cors({ origin: true }));

    // app.post('/users',
    //     isAuthenticated,
    //     isAuthorized({ hasRole: ['admin', 'manager'] }),
    //     create
    // );
    app.get('/all', [
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'user'] }),
        all
    ]);
    // app.get('/users/:id', [
    //     isAuthenticated,
    //     isAuthorized({ hasRole: ['admin', 'manager'], allowSameUser: true }),
    //     get
    // ]);
    // app.patch('/users/:id', [
    //     isAuthenticated,
    //     isAuthorized({ hasRole: ['admin', 'manager'], allowSameUser: true }),
    //     patch
    // ]);
    // app.delete('/users/:id', [
    //     isAuthenticated,
    //     isAuthorized({ hasRole: ['admin', 'manager'], allowSameUser: true }),
    //     remove
    // ]);
    return functions.https.onRequest(main)
}
