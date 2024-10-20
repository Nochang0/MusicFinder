// config.ts

// 고정 변수


const SeoWonConfig = {
	DB_URL: "mongodb+srv://heroku777777:aj135222@seowon.xhr52um.mongodb.net/?retryWrites=true&w=majority",
	Collections: {
		KAKAO_UserList:
	}
};

// 가변 변수
let refresh_token: string = "";

// 전체(KakaoRocket) 전용 환경변수
const Config = { SeoWonConfig, refresh_token };

export default Config;