import Config from '../config.ts';
import axios, { AxiosResponse } from "axios";
import * as Type from './types/chat-type.ts';
import { Inside_ChatSendResponse, Inside_ChatList, Inside_ChatListForm, KakaoChatType, ChatType } from './types/chat-type.ts';


class Chat {
	// Chat 타입들
	static Type = Type;
	
	// 유저 대화내역 plusId 감지
	public static async isPlusIdInChat(token: string, channelId: string, roomId: string, plusId: string, LastSeenlogId: string): Promise <boolean> {
		try {
			LastSeenlogId = (BigInt(LastSeenlogId) - BigInt(1)).toString();		// logid에 -1 하기
			const { data }: AxiosResponse <Inside_ChatListForm> = await axios({
				url: `https://pf-mapi.kakao.com/profiles/${channelId}/chats/${roomId}/chatlogs?direction=forward&since=${LastSeenlogId}&size=20`,
				method: "GET",
				headers: {
					"User-Agent": Config.User_Agent,
					"content-type": "application/json; charset=UTF-8",
					"Authorization": token
				}
			});
			
			// 채팅내역에 plusId 포함여부 확인
			const _isInclude: Inside_ChatList | undefined = data.items.find((talk) => talk.message.includes(plusId));
			if (_isInclude) return true;		// 포함되었으면 true Return
			return false;						// 없으면 false Return
		} catch (e: any) {
			if (e.response.data?.message == 'Unauthorized') return false;
			return false;
		}
	}
	
	
	// 텍스트 메세지
	public static async sendChat(roomId: string, text: string, attachment?: Object): Promise <boolean> {
		const basicChat: boolean = await Chat.sendRaw(Config.access_token, Config.channelId, roomId, KakaoChatType.TEXT, text, attachment || {});
		if (basicChat) return true;
		return false;
	}
	
	
	// 커스텀 메세지 보내기
	public static async sendRaw(token: string, channelId: string, roomId: string, type: ChatType, text: string, attachment?: Object): Promise <boolean> {
        try {
			attachment = attachment || {};	// attachment 없으면 {}
            const { data }: AxiosResponse <Inside_ChatSendResponse> = await axios({
                url: `https://pf-mapi.kakao.com/profiles/${channelId}/chats/${roomId}/chatlogs`,
                method: 'POST',
                data: {
                    'type': type,
                    'message': text,
					'attachment': JSON.stringify(attachment)
                },
                headers: {
                    'User-Agent': Config.User_Agent,
                    'content-type': 'application/json; charset=UTF-8',
                    'Authorization': token
                }
            });
            return true;
        } catch (e: any) {
			console.log(String(e));
            if (e.response.data?.message === 'Unauthorized') return false;
            return false;
        }
    }
}

export default Chat;
