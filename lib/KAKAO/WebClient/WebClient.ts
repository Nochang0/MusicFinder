import axios, { AxiosResponse } from "axios";
import { InsideCodeData, InsideKakaoTokenData } from './types/WebClientTypes.ts';

// 메인 클래스(WebClient)를 위한 서브 함수 모음
class SubFunctions {
	protected static readonly clientId: string = "72206f4d7e882efb7e2db98c965ebbf6";
    protected static readonly redirect_uri: string = `kakao${SubFunctions.clientId}://oauth`;
	
	
	// 카카오 웹 로그인 1차 인증 코드 가져오기
    protected static async getToken(Cookie: string): Promise <InsideCodeData | boolean> {
        try {
            const { data }: AxiosResponse = await axios({
                url: `https://kauth.kakao.com/oauth/authorize?client_id=${SubFunctions.clientId}&redirect_uri=${SubFunctions.redirect_uri}&response_type=code&code_challenge=&code_challenge_method=S256&ka=sdk%2F2.9.0%20sdk_type%2Fkotlin%20os%2Fandroid-30%20lang%2Fko-KR%20origin%2F7MRbkCrB6DyL4XWKJX5nSS3jdFY%3D%20device%2FSM-X706N%20android_pkg%2Fcom.kakao.yellowid%20app_ver%2F3.21.1`,
                method: "GET",
                headers: { 'Cookie': Cookie }
            });
			// 1차 인증 코드
            const csts: string | undefined = data.csts;
            const stsc: string | undefined = data.stsc;
			
			// 로그인 쿠키 오류 (유효기간이 지남)
			if (csts === undefined || stsc === undefined) return false;
			
            return { csts, stsc };
        } catch (e) {
			return false;
        }
    }

	// 카카오 웹 로그인 2차 인증 코드 가져오기
    protected static async getVerifyCode(Cookie: string, Tokens: InsideCodeData): Promise <boolean | string> {
        try {
            const { data }: AxiosResponse = await axios({
                url: `https://kauth.kakao.com/oauth/authorize`,
                method: "POST",
                data: `csts=${Tokens.csts}&stsc=${Tokens.stsc}&user_oauth_approval=true`,
                headers: { 'Cookie': Cookie }
            });
            console.log(data);
			return false;	// 로그인 실패
        } catch (e: any) {
			const code: string = (e.request._options.path as string).split("?code=")[1];
			return code;
		}
    }

	// 카카오톡 채널 로그인 토큰 얻기
    protected static async getKakaoToken(VerifyCode: string): Promise <InsideKakaoTokenData | boolean> {
		try {
			const { data }: AxiosResponse = await axios({
				url: `https://kauth.kakao.com/oauth/token`,
				method: "POST",
				data: `client_id=${SubFunctions.clientId}&code=${VerifyCode}&redirect_uri=${SubFunctions.redirect_uri}&grant_type=authorization_code`
			});
			return data;
		} catch(e) {
			return false;
		}
    }
}

// 카카오 웹 로그인 & 카카오톡 채널 토큰 가져오기
class WebClient extends SubFunctions {
	
	// 카카오 웹 로그인 통합 함수
	public static async Login(Cookie: string): Promise <string | boolean> {
		try {
			// 1차 인증 코드 얻기
			const Web_Token: InsideCodeData | boolean = await WebClient.getToken(Cookie);
			if (typeof Web_Token === 'boolean') return false;

			// 2차 인증 코드 얻기
			const Verify_Code: string | boolean = await WebClient.getVerifyCode(Cookie, Web_Token);
			if (typeof Verify_Code === 'boolean') return false;

			// 카카오 채널 토큰 얻기 (refresh_token)
			const Channel_Tokens: InsideKakaoTokenData | boolean = await WebClient.getKakaoToken(Verify_Code);
			if (typeof Channel_Tokens === 'boolean') return false;
			
			// 카카오톡 채널 리프레쉬 토큰 추출
			const result: string = Channel_Tokens.refresh_token;
			return result;
		} catch(e) {
			return false;
		}
	}
}




export default WebClient;
