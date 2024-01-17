import { Request, Response } from 'express';

export class AuthController {
  public login(req: Request, res: Response): void {
    // Handle login logic here
    res.send('Login logic here');
  }

  public register(req: Request, res: Response): void {
    // Handle registration logic here
    res.send('Registration logic here');
  }

  public oauth(req: Request, res: Response): void {
    // const instagramAuthUrl = `https://api.instagram.com/oauth/authorize?client_id=${instagramClientId}&redirect_uri=${instagramRedirectUri}&scope=${instagramScope}&response_type=code`;
    console.log(req.params);
    res.status(200).send('success')
  }
}
