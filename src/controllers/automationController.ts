import { Request, Response } from 'express';

export class AutomationController {
  public runAutomation(req: Request, res: Response): void {
    // Handle automation logic here
    let body = req.body;
    if (body.object === "instagram") {
      console.log(body.entry);
      res.status(200).send("EVENT_RECEIVED");
    } else {
      res.sendStatus(404);
    }
    // res.status(200).send('Automation logic here');
  }

  public bindWebhooks(req: Request, res: Response): void {
    const challenge = req.query['hub.challenge'];
    res.status(200).send(challenge);  // Just the challenge
  }
}