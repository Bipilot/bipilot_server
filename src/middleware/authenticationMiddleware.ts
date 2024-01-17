import { Request, Response, NextFunction } from 'express';
import Jwt from "jsonwebtoken";


export class AuthMiddleware {
  public isAuthenticated(req: Request, res: Response, next: NextFunction) {
    // Here you would check the authentication status
    // const token: any = req.header('Authorization');
    // if (!token) {
    //   return res.status(401).json({ error: 'Access denied' });
    // }
    try {
      // const secret: any = process.env.JWT_SECRET;
      // const decoded: any = Jwt.verify(token, secret);
      // req.query.access_token = decoded.access_token;
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  }

  public isVerifiedWebhook(req: Request, res: Response, next: NextFunction) {
    const verify_token = req.query['hub.verify_token'];
    if (verify_token === process.env.FB_WEBHOOKS_VERIFICATION_TOKEN) {
      next()
    } else {
      return res.status(400).send({ message: "Bad request!" });
    }
  }
}
