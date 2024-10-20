import KAKAO from '../../../KAKAO';
import Config from '../../config.ts';
import { KakaoChatType, ChatType } from '../types/chat-type.ts';

async function Example() {
	const refresh_token = "JoktZWdVFzY907KBGh-B6uS9TUoPRZ0DkgsKPXNOAAABjPdmf6hHueF-5ScOZw";

	// 카카오톡 채널 관리자 앱 로그인 => 엑세스 토큰 가져오기
	const LoginToken: string | boolean = await KAKAO.KakaoRocket.Client.Login(refresh_token);
	if (typeof LoginToken === 'boolean') return console.log(LoginToken);
	console.log("Access Token:", LoginToken);
	
	Config.access_token = LoginToken;	// 채널 엑세스 토큰
	Config.channelId = "410245274";		// 채널 프로필 고유 Id

	// 커스텀 메세지 보내기
	const CustomChat: boolean = await KAKAO.KakaoRocket.Chat.sendRaw(LoginToken, "410245274", "4895492792207433", 1, "안녕");
	if (CustomChat === false) return console.log(CustomChat);
	console.log(CustomChat);
	
	// 채널의 유저 상세정보 가져오기
	const TextChat: boolean = await KAKAO.KakaoRocket.Chat.sendChat('4895492792207433', "반가워");
	if (TextChat === false) return console.log(TextChat);
	console.log(TextChat);
	
	
}

Example();

// clear && ts-node ChatTest