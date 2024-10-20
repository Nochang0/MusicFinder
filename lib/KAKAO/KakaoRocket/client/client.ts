import * as fs from 'fs';
import axios, { AxiosResponse } from 'axios';
import { Inside_LoginTokenData } from './types/client-type.ts';

class Client {
	private static readonly clientId: string = "72206f4d7e882efb7e2db98c965ebbf6";

	
	// 카카오톡 채널 관리자 로그인
    public static async Login(refresh_token: string): Promise <string | boolean> {
        try {
            const { data }: AxiosResponse = await axios({
                url: "https://kauth.kakao.com/oauth/token",
                method: "POST",
                data: `client_id=${Client.clientId}&android_key_hash=7MRbkCrB6DyL4XWKJX5nSS3jdFY=&refresh_token=${refresh_token}&grant_type=refresh_token`,
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            });

            const AccessToken: string = `Bearer ${data.access_token}`;
            return AccessToken;
        } catch (e: any) {
			// refresh_token이 갱신되어 올 경우
            if (e.response.data?.refresh_token) {
				fs.writeFileSync("../../../static/txt/Kakao_Channel_refresh_token.txt", String(e.response.data.refresh_token));
			}
			
			// refresh_token 유효기간이 지남
            if (e.response.data?.error_description == 'expired_or_invalid_refresh_token' || e.response.data?.error == 'invalid_grant') return false;
            return false;
			/*
				{
					error: 'invalid_grant',
					error_description: 'expired_or_invalid_refresh_token',
					error_code: 'KOE322'
				}
			*/
        }
    }
	
}

export default Client;
