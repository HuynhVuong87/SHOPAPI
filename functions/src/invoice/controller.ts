import { Request, Response } from "express";
import * as admin from 'firebase-admin';
const tauist = require('tauist');
const Treasury = require('treasury');

const treasury = new Treasury({
    ttl: tauist.ms.thirtyMinutes
});

async function  getAllData() {
    // replace this with your actual Promise code doing the "real work" that you want to cache
    console.log("getalldata");
    return new Promise((resolve, reject) => {
        const db = admin.firestore();
        let stuff: any = [];
        db.collection("stores").get().then(snapshot => {
            snapshot.forEach(doc => {
                const newelement = {
                    "id": doc.id,
                    "name": doc.data().name,
                }
                stuff = stuff.concat(newelement);
            });
            console.log(stuff);
            resolve(stuff);
        }).catch(err => {
            reject("err" + err);
        })
    });
}

export async function all(req: Request, res: Response) {
    try {

        res.set('Cache-Control', `public, max-age=${tauist.s.thirtyMinutes}, s-maxage=${tauist.s.thirtyMinutes}`);

        treasury.invest(getAllData, {})
            .then((data:any) => {
                console.log("data");
                console.log(data);
                res.status(200).send(data);
            })
            .catch((error:any) => {
                console.error('error caught:', error);
                res.status(500).send('Internal Server Error');
            });


        // const db = admin.firestore();
        // let stuff: any = [];
        // await db.collection("stores").get().then(snapshot => {
        //     snapshot.forEach(doc => {
        //         const newelement = {
        //             "id": doc.id,
        //             "name": doc.data().name,
        //         }
        //         stuff = stuff.concat(newelement);
        //     });
        //     console.log(stuff);
        //     res.send(stuff);
        // }).catch((err:any) => {
        //     res.send("err" + err);
        // })
        return "";
    }
    catch (err) {
        return handleError(res, err)
    }
}

function handleError(res: Response, err: any) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
}
