import { Request, Response } from "express";
import { graphAPIUserProfileURL } from "../../libs/helper";
import { MEFields } from "../../libs/config";
import Http from "../../libs/http";
import { insertData, getData, updateData } from "../../db/mongo";
import Jwt from "jsonwebtoken";

export default class Pilot {
    http = new Http();

    /**
     * handle Access Token
     * @param req 
     * @param res 
     */
    public handleAccessToken = (req: Request, res: Response) => {
        // console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
        res.status(200).send('login sucess');
    }

    /**
     * Get User Profile using token
     * @param req access_token
     * @param res 
     */
    public getUserProfile = async (req: Request, res: Response) => {
        let user_access_token: any = req.query.access_token;
        await this.http.send('GET', graphAPIUserProfileURL(), user_access_token, MEFields, null).then(async (userDetails: any) => {
            const userPayload: any = {
                "fb_id": userDetails.data.id,
                "name": userDetails.data.name,
                "user_access_token": user_access_token,
                "email": userDetails.data.email
            };
            let pilot_id;
            await getData(process.env.AUTH_COLLECTION, { fb_id: userDetails.data.id }).then(async (data: any) => {
                if (data.length === 0) {
                    await insertData(process.env.AUTH_COLLECTION, userPayload).then((result: any) => {
                        pilot_id = result.insertedId;
                    }).catch((err) => {
                        return res.status(err.status).send(err);
                    });
                } else {
                    pilot_id = data[0]._id;
                    await updateData(process.env.AUTH_COLLECTION, { fb_id: userDetails.data.id }, userPayload
                    ).then((result) => {
                        console.log(result);
                    }).catch((err) => {
                        return res.status(err.status).send(err);
                    })
                }
            })
            const secret: any = process.env.JWT_SECRET;
            const token = Jwt.sign({ "user_access_token": user_access_token }, secret);
            userPayload['jwt_token'] = token;
            userPayload['pilot_id'] = pilot_id;
            return res.status(userDetails.status).send(userPayload);
        })
    }

}