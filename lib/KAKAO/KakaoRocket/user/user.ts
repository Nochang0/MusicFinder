import Config from '../config.ts';
import axios, { AxiosResponse } from "axios";
import * as Type from './types/user-type.ts';
import { StatusType, Inside_UserList, Inside_UserListForm, Inside_UserInfo } from './types/user-type.ts';


class User {
	static Type = Type;
	
	// 채널의 유저 상세정보 출력
	public static async UserInfo(token: string, channelId: string, roomId: string): Promise <Inside_UserInfo[] | boolean> {
		try {
			const { data }: AxiosResponse <Inside_UserInfo[]> = await axios({
				url: `https://pf-mapi.kakao.com/profiles/${channelId}/chats/${roomId}`,
				method: "GET",
				headers: {
					"User-Agent": Config.User_Agent,
					"content-type": "application/json; charset=UTF-8",
					"Authorization": token
				}
			});
			// console.log(data);
			return data;
		} catch (e: any) {
			if (e.response.data?.message == 'Unauthorized') return false;
			return false;
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
    public static async UserList(token: string, channelId: string, status: StatusType): Promise <Inside_UserList[] | boolean> {
		try {
			const { data }: AxiosResponse <Inside_UserListForm> = await axios({
				url: `https://pf-mapi.kakao.com/profiles/${channelId}/chats/search`,
				method: "POST",
				headers: {
					"User-Agent": Config.User_Agent,
					"content-type": "application/json; charset=UTF-8",
					"Authorization": token
				},
				data: {
					"is_blocked": false,
					"status": status
				}
			});
			
			// 채널 유저목록 저장 리스트
        	const userList: Inside_UserList[] = data.items;
			
			// 유저 정보가 덜 들어왔을 때
            if (data.has_next) {
				let lastLogId = data.items[data.items.length - 1].last_log_id;		// 마지막 유저 대화 메세지 ID
				// 모든 유저목록를 받을 때 까지 반복
				while (true) {
					// 누락 유저목록 가져오기
					let moreUsers: Inside_UserListForm | boolean = await User.moreUserList(token, channelId, status, lastLogId);
					if (typeof moreUsers === 'boolean') return false;
					
					// 전부 저장완료 했을 경우
                    if (!moreUsers.has_next) {
						console.time("AlgorithmTime-TEST");		// 시간 체크
                        moreUsers.items.forEach((x: Inside_UserList) => userList.push(x));
						console.timeEnd("AlgorithmTime-TEST");	// 체크 끝
                        break;
                    } else {
                        lastLogId = moreUsers.items[moreUsers.items.length - 1].last_log_id;
                        moreUsers.items.forEach((x: Inside_UserList) => userList.push(x));
                    }
                }
            }
            return userList;
        } catch (e: any) {
			// token 에러 (유효기간 지남(예상) | 옳지 않은 토큰)
			if (e.response.data?.message == 'Unauthorized') return false;
			return false;
		}
	}
	
	// 누락된 채널 유저목록 가져오기
	private static async moreUserList(token: string, channelId: string, status: StatusType, logId: string): Promise <Inside_UserListForm | boolean> {
		try {
			const { data }: AxiosResponse <Inside_UserListForm> = await axios({
				url: `https://pf-mapi.kakao.com/profiles/${channelId}/chats/search?since=${logId}`,
				method: "POST",
				headers: {
					"User-Agent": Config.User_Agent,
					"content-type": "application/json; charset=UTF-8",
					"Authorization": token
				},
				data: {
					"is_blocked": false,
					"status": status
				}
			});
            return data;
		} catch (e: any) {
			// token 에러 (유효기간 지남(예상) | 옳지 않은 토큰)
			if (e.response.data?.message == 'Unauthorized') return false;
			return false;
		}
	}
}

export default User;