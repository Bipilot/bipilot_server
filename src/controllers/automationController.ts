import { Request, Response } from 'express';
import Message from '../libs/automations/messages';

const access_token = "EAAEVPoitIHIBO8n2i27lOu02ZCTScg9G5d6AwtIKd0esZAAZBkWdlFWfxCOzGoncRSGuEracKQK0bxHZB9B8nXhSUJCsjc4u4EJ14BTwJUTZAWGPYE2bwPOFFEdlVnS2ZBnzZAmR3Eabmj3ZAZBOFLBNFjuZCmUrS9DZAYxZCtpe3MKtfjs82NlWSckSlsPw5chmZAnbFZC3WdCXFDcpBzhFUZD"
;const message = new Message(access_token);
export class AutomationController {
  public runAutomation(req: Request, res: Response): void {
    // Handle automation logic here
    let body = req.body;
    if (body.object === "instagram") {
      console.log(body.entry);
      if(body.entry[0]['messaging']){
        let msg = body.entry[0]['messaging'];
        if(msg[0]['postback']){
          message.send(msg[0]['sender'].id);
        }
      }
      res.status(200).send("EVENT_RECEIVED");
    } else {
      console.log(body)
      res.sendStatus(404);
    }
  }

  public bindWebhooks(req: Request, res: Response): void {
    const challenge = req.query['hub.challenge'];
    res.status(200).send(challenge);  // Just the challenge
  }
}