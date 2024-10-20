import * as fs from "fs";
import axios, { AxiosResponse } from "axios";
import { Inside_LoginTokenData } from './types/KakaoRocketTypes.ts';


class KakaoRocket {
	private static readonly clientId: string = "72206f4d7e882efb7e2db98c965ebbf6";
	private static readonly User_Agent: string = "KAKAOROCKET/3.24.0_207 Android/10 SM-X900N"

	
	// 카카오톡 채널 관리자 로그인
	public static async Login(refresh_token: string): Promise <string | boolean> {
		try {
			const { data }: AxiosResponse = await axios({
				url: "https://kauth.kakao.com/oauth/token",
				method: "POST",
				data: `client_id=${KakaoRocket.clientId}&android_key_hash=7MRbkCrB6DyL4XWKJX5nSS3jdFY=&refresh_token=${refresh_token}&grant_type=refresh_token`,
				headers: { "Content-Type": "application/x-www-form-urlencoded" }
			});
			
			const AccessToken: string = `Bearer ${data.access_token}`;
			return AccessToken;
        } catch (e) {
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

	/*
		전체: all
		진행중채팅: progress
		안읽은채팅: not-read
		미답변채팅: not-replied
		답변한채팅: replied
		완료된채팅: done
		차단된채팅: blocked
	*/

	// 채널의 모든 유저 목록&정보 출력
    public static async UserList(token: string, channelId: string, status: string): Promise <Inside_UserInfo[] | boolean> {
        try {
			const { data }: AxiosResponse = await axios({
				url: `https://pf-mapi.kakao.com/profiles/${channelId}/chats/search`,
				method: "POST",
				json: true,
				headers: {
					"User-Agent": KakaoRocket.User_Agent,
					"content-type": "application/json; charset=UTF-8",
					"Authorization": token
				},
				data: {
					"is_blocked": false,
					"status": status
				}
			});
			
			// 채널 유저정보 저장 리스트
            const userList: Inside_UserInfo[] = data.items;
			
			// 유저 정보가 덜 들어왔을 때
            if (data.has_next) {
				
			// 마지막 유저 대화 메세지 ID
            const lastLogId: string = data.items[data.items.length - 1].last_log_id;
            	while (true) {
                    let moreUsers: AxiosResponse = await KakaoRocket.moreUserList(token, channelId, status, lastLogId);
					// 전부 저장완료 했을 경우
                    if (!moreUsers.data.has_next) {
                        moreUsers.data.items.map((x: Inside_UserInfo) => userList.push(x));
                        break;
                    } else {
                        lastLogId = moreUsers.data.items[moreUsers.data.items.length - 1].last_log_id;
                        moreUsers.data.items.map((x: Inside_UserInfo) => userList.push(x));
                    }
                }
            }
            return userList;
        } catch (e) {
			// token 에러 (유효기간 지남(예상) | 옳지 않은 토큰)
            if (e?.response.data?.message == 'Unauthorized') return false;
            return false;
        }
    }

	// 누락된 채널 유저정보 가져오기
    private static async moreUserList(token: string, channelId: string, status: string, logId: string): Promise <AxiosResponse> {
        try {
            const { data }: AxiosResponse = await axios({
                url: `https://pf-mapi.kakao.com/profiles/${channelId}/chats/search?since=${logId}`,
                method: "POST",
                json: true,
	            headers: {
                    "User-Agent": KakaoRocket.User_Agent,
                    "content-type": "application/json; charset=UTF-8",
                    "Authorization": token
                },
                data: {
                    "is_blocked": false,
                    "status": status
                }
            });
            return data;
        } catch (e) {
			// token 에러 (유효기간 지남(예상) | 옳지 않은 토큰)
			if (e?.response.data?.message == 'Unauthorized') return false;
			return false;
		}
	}
}

export default KakaoRocket;
