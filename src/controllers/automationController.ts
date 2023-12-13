import { Request, Response } from 'express';

export class AutomationController {
  public runAutomation(req: Request, res: Response): void {
    // Handle automation logic here
    res.send('Automation logic here');
  }
}
