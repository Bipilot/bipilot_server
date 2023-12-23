import { Request, Response, NextFunction } from 'express';

export class AuthMiddleware {
  public isAuthenticated(req: Request, res: Response, next: NextFunction): void {
    // Here you would check the authentication status
    const authenticated = true; // Replace with actual authentication check

    if (authenticated) {
      next();
    } else {
      res.status(401).send('Not authenticated');
    }
  }

  public isVerifiedWebhook(req: Request, res: Response, next: NextFunction): void {
    const verify_token = req.query['hub.verify_token'];
    if (verify_token === "TEST_IG") { //process.env.FACEBOOK_VERIFICATION_TOKEN
      next()
    } else {
      res.status(400).send({ message: "Bad request!" });
    }
  }
}
