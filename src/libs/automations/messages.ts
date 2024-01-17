import { Request, Response } from 'express';
import { graphAPIMessageURL } from '../helper';
import Http from '../http';

export default class Message {
  http= new Http();
  constructor(public access_token:string){}
  public send = (recipient_id: string) => {
    const resp = this.http.send('POST',graphAPIMessageURL(),this.access_token, null, {
      "recipient": {
        "id": recipient_id
      },
      "message": {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "button",
            "text": "Login to install Bipilot!",
            "buttons": [
              {
                "type": "web_url",
                "url": "https://www.bipilot.in",
                "title": "Login"
              }
            ]
          }
        }
      }
    }).then((res:any)=>{
      console.log(res);
    })
  }

}
