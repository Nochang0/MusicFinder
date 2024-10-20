/*
함수 리턴형은 type, 내부 객체 리턴형은 interface
type은 form까지, interface는 data까지
함수 내부 요소 리턴형엔 inside를 붙인다.
*/


// 카카오 웹 로그인 1차 인증코드 JSON 구성
export interface InsideCodeData {
	csts: string;
	stsc: string;
}


// 카카오톡 채널 로그인 완료 토큰 JSON
export interface InsideKakaoTokenData {
	access_token: string;
	token_type: string;
	refresh_token: string;
	expires_in: number;
	scope: string;
	refresh_token_expires_in: number;
}