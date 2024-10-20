import KAKAO from '../../../KAKAO';
import { Inside_UserList, Inside_UserListForm, Inside_UserInfo } from '../types/user-type.ts';

async function Example(): any {
	const refresh_token = "JoktZWdVFzY907KBGh-B6uS9TUoPRZ0DkgsKPXNOAAABjPdmf6hHueF-5ScOZw";

	// 카카오톡 채널 관리자 앱 로그인 => 엑세스 토큰 가져오기
	const LoginToken: string | boolean = await KAKAO.KakaoRocket.Client.Login(refresh_token);
	if (typeof LoginToken === 'boolean') return console.log(LoginToken);
	console.log("Access Token:", LoginToken);
	
	// 채널 유저목록 가져오기
	const getUserList: Inside_UserList[] | boolean = await KAKAO.KakaoRocket.User.UserList(LoginToken, "410245274", "progress");
	if (typeof getUserList === 'boolean') return console.log(getUserList);
	// console.log(getUserList);
	
	// 닉네임으로 검색
	const myInfo = getUserList.find(info => info.talk_user.nickname == "ㅅㅎ");
	if (myInfo) return console.log(myInfo);
	
	// 채널의 유저 상세정보 가져오기
	// const getUserInfo: Inside_UserInfo[] | boolean = await KAKAO.KakaoRocket.User.UserInfo(LoginToken, "410245274", "4895629484446846");
	// if (typeof getUserInfo === 'boolean') return console.log(getUserInfo);
	// console.log(getUserInfo);
}

Example();

// clear && ts-node UserTest