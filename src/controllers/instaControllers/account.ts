import { Request, Response } from "express";
import { graphAPIGetAllAccountsURL } from "../../libs/helper";
import { AccountFields } from "../../libs/config";
import Http from "../../libs/http";
import { insertData, getData, updateData } from "../../db/mongo";
import { ObjectId } from "mongodb";

export default class Account {
    http = new Http();

    public getAllSocialAccounts = async (req: Request, res: Response) => {
        let user_access_token: any = req.query.user_access_token;
        await this.http.send('GET', graphAPIGetAllAccountsURL(), user_access_token, AccountFields, null).then((response) => {
            response.data['pilot_id'] = req.query.pilot_id
            res.status(response.status).send(response.data);
        })
    }

    public accountActivation = async (req: Request, res: Response) => {
        if (req.query.ig_id) {
            await getData(process.env.ACCOUNT_COLLECTION, { "ig_id": req.query.ig_id }).then(async (acc: any) => {
                if (acc.length === 0) {
                    const accountPayload: any = {
                        "ig_id": req.query.ig_id,
                        "pilot_id": req.query.pilot_id,
                        "page_id": req.query.page_id,
                        "account_name": req.query.account_name,
                        "page_access_token": req.query.page_access_token,
                        "status": "active",
                        "platform": "IG"
                    };
                    await insertData(process.env.ACCOUNT_COLLECTION, accountPayload).then((account: any) => {
                        res.status(200).send({ "pilot_id": accountPayload.pilot_id, "account_id": account.insertedId });
                    }).catch((err) => {
                        res.status(500).send(err);
                    })
                } else {
                    const accountPayload: any = {
                        "status": "active",
                    };
                    await updateData(process.env.ACCOUNT_COLLECTION, { "ig_id": req.query.ig_id }, accountPayload).then(() => {
                        res.status(200).send("success");
                    }).catch((err) => {
                        res.status(500).send(err);
                    })
                }
            })
        } else {
            res.status(500).send("Method not allowed");
        }
    }

    public accountDeactivation = async (req: Request, res: Response) => {
        const accountPayload: any = {
            "status": "inactive",
        };
        await updateData(process.env.ACCOUNT_COLLECTION, { "_id": new ObjectId(req.params.account_id) }, accountPayload).then((acc:any) => {
            console.log(acc);
            res.status(200).send("success");
        }).catch((err) => {
            res.status(500).send(err);
        })
    }

    public getAccountsByPilot = async (req: Request, res: Response) => {
        await getData(process.env.ACCOUNT_COLLECTION, { "pilot_id": req.query.pilot_id }).then(async (acc: any) => {
            res.status(200).send(acc);
        }).catch((err) => {
            res.status(500).send(err);
        })
    }
}