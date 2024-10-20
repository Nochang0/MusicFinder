import KAKAO from '../../../KAKAO';
import { Inside_LoginTokenData } from '../types/client-type.ts';

async function Example() {
	const refresh_token = "JoktZWdVFzY907KBGh-B6uS9TUoPRZ0DkgsKPXNOAAABjPdmf6hHueF-5ScOZw";

	// 카카오톡 채널 관리자 앱 로그인 => 엑세스 토큰 가져오기
	const LoginToken: string | boolean = await KAKAO.KakaoRocket.Client.Login(refresh_token);
	if (typeof LoginToken === 'boolean') return console.log(LoginToken);
	console.log(LoginToken);

}

Example();

// clear && ts-node LoginTest