// config.ts

// 고정 변수
const Channel_Search_Id: string = "musicfinder";
const MyUrl: string = "http://musicfinder.o-r.kr:3010";
const channel_profile_id: string = "421451751";

// 가변 변수
let kakao_refresh_token: string = "AcZ5SACHOkJqkREaGrU3EyKr4IjZ2gFXAAAAAgo8JJoAAAGSqQ23xEe54X7lJw5n";
let kakao_access_token: string = '';		// 카톡 채널 관리자 엑세스 토큰

// 채널 라우터 전용 환경변수
const Config = { Channel_Search_Id, MyUrl, channel_profile_id, kakao_refresh_token, kakao_access_token };

export default Config;