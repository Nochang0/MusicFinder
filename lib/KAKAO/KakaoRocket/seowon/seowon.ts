import KAKAO from '../../KAKAO.ts';
import axios, { AxiosResponse } from "axios";

// 사용할 type
interface Inside_ChatList extends KAKAO.KakaoRocket.chat.type.Inside_ChatList {};
interface Inside_UserList extends KAKAO.KakaoRocket.chat.user.Inside_UserList {};


// KakaoRocket 서원냥이 전용 기능
class seowon {

	// plusId로 유저목록에 해당하는 유저찾기 (RETURN: 유저정보 | false)
	public static async inPlusId(token: string, channelId: string, roomId: string, plusId: string, LastSeenlogId: string, Userlist: Inside_UserList) {
		// 유저 찾기 (plusId)
		const findUser: Inside_ChatList | undefined = Userlist.find(async (info) => {
			const roomId = info.id;
			let _findPlusId: boolean = await KAKAO.KakaoRocket.chat.isPlusIdInChat(token, channelId, roomId, plusId, info.last_seen_log_id);
			if (_findPlusId) return info;
		});
		if (!findUser) return false;	// 없으면 false Return
		return findUser;				// 있으면 유저정보 Return
	}
	
}

export default seowon;
