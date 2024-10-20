import WebClient from './WebClient/WebClient.ts';			// 카카오 웹 로그인 API
import KakaoRocket from './KakaoRocket/KakaoRocket.ts';		// 카카오톡 채널 관리자 API
import OpenBuilder from './OpenBuilder/OpenBuilder.ts';		// 카카오톡 채널 공식 챗봇 API


class KAKAO {
	static WebClient = WebClient;
	static KakaoRocket = KakaoRocket;
	static OpenBuilder = OpenBuilder;
}

export default KAKAO;