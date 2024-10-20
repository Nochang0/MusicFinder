// config.ts

// 고정 변수
const User_Agent: string = "KAKAOROCKET/3.24.0_207 Android/10 SM-X900N";
const clientId: string = "72206f4d7e882efb7e2db98c965ebbf6";

// 가변 변수
let refresh_token: string = "";
let access_token: string = "";
let channelId: string = "";
let roomId: string = "";

// 전체(KakaoRocket) 전용 환경변수
const Config = { User_Agent, refresh_token, access_token, channelId };

export default Config;