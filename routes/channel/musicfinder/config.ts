// config.ts

// 고정 변수
const Channel_Search_Id: string = "musicfinder";
// const MyUrl: string = "http://musicfinder.o-r.kr:3010";
const MyUrl: string = "https://ba4e3e95b18b4c8361612352540faaf7.serveo.net";
const channel_profile_id: string = "421451751";

// 가변 변수
var kakao_refresh_token: string = "AcZ5SACHOkJqkREaGrU3EyKr4IjZ2gFXAAAAAgo8JJoAAAGSqQ23xEe54X7lJw5n";
var kakao_access_token: string = '';		// 카톡 채널 관리자 엑세스 토큰


// 채널 라우터 전용 환경변수
const Config = { Channel_Search_Id, MyUrl, channel_profile_id, kakao_access_token, kakao_refresh_token };

Object.defineProperties(Config, {
    kakao_access_token: {
        get: () => kakao_access_token,
        set: (token: string) => { kakao_access_token = token; }
    },
    kakao_refresh_token: {
        get: () => kakao_refresh_token,
        set: (token: string) => { kakao_refresh_token = token; }
    }
});

export default Config;