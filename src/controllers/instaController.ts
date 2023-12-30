import { Request, Response } from 'express';
import axios from 'axios';
import { appId, appSecret } from '../config';

export class InstaController {
  public async getLiveLongToken(req: Request, res: Response): Promise<void> {
    try {
      const { fb_exchange_token } = req.body;

      if (!fb_exchange_token) {
        res.status(401).json({ success: false, message: 'fb_exchange_token is required' });
        return;
      }

      const apiUrl = `https://graph.facebook.com/v17.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${fb_exchange_token}`;

      const apiResponse = await axios.get(apiUrl);

      // Handle the response from the Facebook API as needed
      res.json({ success: true, data: apiResponse.data });
    } catch (error) {
      console.error('Error making Facebook API request:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
  public async getInstaProfileDetail(req: Request, res: Response): Promise<void> {
    try {
      const { access_token } = req.body;

      if (!access_token) {
        res.status(401).json({ success: false, message: 'access_token is required' });
        return;
      }
      const getAppIdApiUrl = `https://graph.facebook.com/v17.0/me?fields=id,name&access_token=${access_token}`;
    
      const apiResponse = await axios.get(getAppIdApiUrl);
      // get app id
      if(apiResponse.data){
        
        const getPages =  `https://graph.facebook.com/v16.0/${apiResponse.data.id}/accounts?access_token=${access_token}`;
        const pageResponse = await axios.get(getPages);
        // get pageids
        if(pageResponse.data.data){
          interface PageItem {
            id: string;
          }        
          const pageIdsdata: PageItem[] = pageResponse.data.data;
  
          const result: string[] = pageIdsdata.map((item: PageItem) => item.id).filter(Boolean);

          if(result){
            for (const id of result) {

              // get insta id
              const getInstaId =  `https://graph.facebook.com/v16.0/${id}?fields=instagram_business_account&access_token=${access_token}`;
              
              interface InstagramResponse {
                instagram_business_account?: {
                  id: string;
                };
              }

              const instaIdResponse = await axios.get<InstagramResponse>(getInstaId);

              if (instaIdResponse.data.instagram_business_account) {

                const instagramAccountId = instaIdResponse.data.instagram_business_account.id;
                
                // get insta profile details
                const getInstaProfie =  `https://graph.facebook.com/v17.0/${instagramAccountId}?fields=name,biography,ig_id,followers_count,follows_count,id,profile_picture_url,website,username,media_count&access_token=${access_token}`;
                const profileResponse = await axios.get(getInstaProfie);
                // console.log(`profile response: ${profileResponse}`);
                res.json({ success: true, data: profileResponse.data });
                return;
              }
              // else {
              //   console.log("instagram_business_account does not exist or is null/undefined");
              // }
            }
            
          }          
        }
      }
      res.json({ success: false, data: [] });
    } catch (error) {
      console.error('Error making Facebook API request:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
  public async getPostDetail(req: Request, res: Response): Promise<void> {
    try {
      const { access_token,instagramAccountId } = req.body;

      if (!access_token) {
        res.status(401).json({ success: false, message: 'access_token is required' });
        return;
      }

      const getInstaPostIds =  `https://graph.facebook.com/v17.0/${instagramAccountId}?fields=media&access_token=${access_token}`;
      const PostIdsResponse = await axios.get(getInstaPostIds);

      if(PostIdsResponse.data.media.data){
        const PostResponse = [];
        for (const item of PostIdsResponse.data.media.data) {
          const id = item.id;
          
          const apiUrl = `https://graph.facebook.com/v16.0/${id}?fields=comments_count,caption,id,is_comment_enabled,like_count,media_product_type,media_type,media_url,permalink,thumbnail_url&access_token=${access_token}`;

          const apiPostResponse = await axios.get(apiUrl);

          PostResponse.push(apiPostResponse.data);
        }

        res.json({ success: true, data: PostResponse });
        return;
      }
      res.json({ success: true, data: "Post Not Available" });
    } catch (error) {
      // console.error('Error making Facebook API request:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
}
