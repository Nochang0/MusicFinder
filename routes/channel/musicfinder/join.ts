// Library
import * as fs from 'fs';
import * as url from 'url';
import { EventEmitter } from 'events';
import bodyParser from 'body-parser';
import express, { Request, Response, NextFunction, Router } from 'express';

// Custom Library
import KAKAO from '../../../lib/KAKAO/KAKAO.ts';				// 카카오 API
import DBManager from '../../../lib/DATABASE/DBManager.ts';		// DB 관리 라이브러리

// TypeManager
import TypeManager from '../../../typeList/TypeManager.ts';

// 채널 전용 Config
import Config from './config.ts';

// 서원냥이 Router (Express Event)
const router: Router = express.Router();

// 미들웨어 설정
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// 시작 세팅 이벤트
const Emitter = new EventEmitter();
if (Config.kakao_access_token === '') Emitter.emit('setting');

// 임시 데이터 타입 설정
interface AllInfoForm {
	[plusId: string]: {
		nickname: string;
		userId: string;
		roomId: string;
	}
}

// 가입 메세지 전송
router.post('/SignUp', async (req: Request, res: Response) => {
	// 오픈빌더 스킬 변수들
	const _skillReq: TypeManager.SkillPayload = req.body;							// 카톡 챗봇 질문 Payload
	const plusId: string = _skillReq.userRequest.user.properties.plusfriendUserKey;	// plusId
	const isFriend: boolean = _skillReq.userRequest.user.properties.isFriend;		// 친구추가 여부
	
	if (!isFriend) return res.json(KAKAO.OpenBuilder.SkillManager.simpleText("채널 친구추가를 해주신 후 다시 시도해주세요."));
	
	const AuthURL: string = `${Config.MyUrl}/kakao/MusicFinder/Certify?plusId=${plusId}`;	// 가입 리다이렉트 URL
	const ButtonOptions: TypeManager.SkillTemplate.ButtonForm = KAKAO.OpenBuilder.SkillManager.buildButton('webLink', "가입하기", AuthURL); // 가입버튼 설정
	return res.json(KAKAO.OpenBuilder.SkillManager.textCard(true, "가입을 시도하려면 아래 버튼을 눌러주세요.", undefined, ButtonOptions));
});


// 채널 유저 인증 메세지 전송받기 및 유저 확인
 router.get('/Certify', async (req: Request, res: Response) => {
	const qd = url.parse(req.url, true).query;	// 파라미터

	// 테스트 용도 로그인
	Emitter.emit('setting');
	
	// 인증메세지 보내기 링크 (유저)
	const certifyTalkUrl: string = KAKAO.OpenBuilder.URLManager.setTalkURL('상담원', Config.Channel_Search_Id, qd.plusId as string);
	
	// 유저 인증 메세지 전송하게 시키기
	res.redirect(certifyTalkUrl);

	console.log('1');
	// 유저 추가
	AddUser(qd.plusId as string);
	
	/* DB로 plusId 확인, 없으면 채널 목록(닉네임, notread)->대화내역(forward) 없으면 없다고 res.json (시간 지나 못 보낼땐 챗봇 파라미터 문서로 관련 대응 기능 찾아보기) */
});



// 카톡 채널 관리자 엑세스 토큰 얻기
async function getToken(): Promise <string | false> {
	// 카카오톡 채널 관리자 앱 로그인 => 엑세스 토큰 가져오기
	const AccessToken: string | boolean = await KAKAO.KakaoRocket.Client.Login(Config.kakao_refresh_token);
	
	// 로그인 성공 여부 감지
	if (typeof AccessToken === 'boolean') return false;
	Config.kakao_access_token = AccessToken;

	return AccessToken;
}

// 카톡 채널DB 유저추가
async function AddUser(plusId: string): Promise <boolean> {
	let username: string = '';		// 유저이름
	
	// 채널 유저목록 가져오기
	const getUserList: TypeManager.KC_userTypes.Inside_UserList[] | boolean = await KAKAO.KakaoRocket.User.UserList(Config.kakao_access_token, Config.channel_profile_id, "not-read");

	// 잘 가져왔는지 검사
	if (typeof getUserList === 'boolean') return false;
	
	// plusId 채팅내역 찾기
	const findUserInfo = async (): Promise <TypeManager.KC_userTypes.Inside_UserList | false> => {
		for (const user of getUserList) {
			const LastSeenlogId: string = user.last_seen_log_id;    // 대화 내역 Id (시작)
			const roomId: string = user.id;                         // 채널유저 세션 Id

			// 채팅 내역에 plusId를 입력 했는지 확인
			const findByPlusId: boolean = await KAKAO.KakaoRocket.Chat.isPlusIdInChat(
				Config.kakao_access_token, 
				Config.channel_profile_id, 
				roomId, 
				plusId, 
				LastSeenlogId
			);
			
			// 유저를 찾았을 때
			if (findByPlusId) {
				username = user.talk_user.nickname;
				return user;
			}
		}

		// 유저를 찾지 못했을 때 false 반환
		return false;
	};


	// console.log(String((findUserInfo as TypeManager.KC_userTypes.Inside_UserList).id));
	// 비동기 리턴값에서 출력이 되는지 테스트 (추후 삭제예정)
	console.log(String(findUserInfo as TypeManager.KC_userTypes.Inside_UserList));


	// DB 함수로 보낼 sendInfo(유저 데이터) 설정
	const getSendInfo = async (plusId: string): Promise <AllInfoForm | false> => {
		const userInfo = await findUserInfo(); // 비동기 함수 호출

		// 저장할 유저를 확인하지 못했을 때
		if (typeof userInfo === "boolean") return false;

		// DB 저장할 유저 데이터 세팅
		let sendInfo: AllInfoForm = {
			[plusId]: {
				nickname: userInfo.talk_user.nickname,
				userId: userInfo.talk_user.id,
				roomId: userInfo.id
			}
		};

		console.log(sendInfo);
		return sendInfo;
	};

	// 세팅된 유저 JSON
	const SendInfoData: AllInfoForm | false = await getSendInfo(plusId);
	if (typeof SendInfoData === "boolean") return false;

	// DB 저장
	const saveUser: boolean = DBManager.LocalDB.Handler.addUser(plusId, SendInfoData);
	if (!saveUser) return false;
	
	// 가입성공 메세지 보내기 (관리자)
	const CustomChat: boolean = await KAKAO.KakaoRocket.Chat.sendRaw(Config.kakao_access_token, plusId, (findUserInfo as TypeManager.KC_userTypes.Inside_UserList).id, 1, `${username}님 가입완료되었습니다.`);
	if (CustomChat === false) return false;
	
	return true;
}


// 카톡 채널관리자 토큰 발급 이벤트
Emitter.on('setting', async () => {
	const KC_Token: string | false = await getToken();

	// 로그인 성공 여부 확인 (안되면 바로 종료)
	if (!KC_Token) return process.exit(0);
	Config.kakao_access_token = KC_Token;

	console.log("카카오톡 채널관리자 토큰: ", KC_Token);
});


// 에러로 인한 서버 종료 방지 이벤트
process.on('uncaughtException', (error: Error) => console.log(error));
	
export = router;