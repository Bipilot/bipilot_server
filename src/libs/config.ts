// cinco pro
// export const appId = '3139720803003475';
// export const appSecret = '502126d6751959e1e74774fcc119829a';

// bipilot
export const redirect_uri = 'https://socialsizzle.herokuapp.com/auth/';
export const instagramScope = 'instagram_basic,instagram_manage_comments,instagram_manage_messages,instagram_manage_insights,pages_show_list,pages_read_engagement,pages_manage_metadata';

// FB Graph API
export const graphApiHost = 'https://graph.facebook.com/';
export const graphApiVersion = 'v18.0';
export const graphApiParamsID = 'me'; //me, user-ig-id, media-id, comment-id
export const MEFields = 'id,email,name,first_name,last_name,gender,age_range,picture,locale,link,timezone,updated_time';
export const AccountFields = 'id,name,access_token,picture,instagram_business_account{id,name,username,profile_picture_url}';
export const MediaFields = 'id,caption,media_type,thumbnail_url,media_url';
export const CommentFields = 'id,timestamp,username,text';
export const UserProfileFields = 'name,username,profile_pic,follower_count,is_user_follow_business,is_business_follow_user';
export const IcebergsFields = 'ice_breakers';
export const IcebergsPlatform = 'platform';
export const SubscribedFields = 'messages';

// enum
export const MediaProductType = ['AD', 'FEED', 'STORY', 'REELS'];
export const MediaType = ['CAROUSEL_ALBUM', 'IMAGE', 'VIDEO'];
export const TemplateType = ['generic', 'button', 'RESPONSE', 'product'];
export const SubscriptionType = ['DM', 'COMMENTS', 'ICEBERGS'];


