import { Request, Response } from "express";
import { graphAPIGetAllAccountsURL } from "../../libs/helper";
import Http from "../../libs/http";
import { insertData, getData, updateData } from "../../db/mongo";

export default class Automation {
    public getAutomations = async (req: Request, res: Response) => {
        await getData(process.env.AUTOMATIONS_COLLECTION, { "account_id": req.query.account_id }).then(async (acc: any) => {
            res.status(200).send(acc);
        }).catch((err) => {
            res.status(500).send(err);
        })
    }

    public getSubscriptions = async (req: Request, res: Response) => {
        await getData(process.env.AUTOMATIONS_COLLECTION, { "account_id": req.query.account_id }).then(async (acc: any) => {
            res.status(200).send(acc);
        }).catch((err) => {
            res.status(500).send(err);
        })
    }

    public addSubscriptions = async () => { }

    public addAutomations = async () => { }

}