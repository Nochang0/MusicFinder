import * as fs from 'fs';

// DB 저장 형식들
import { AllInfoForm } from './types/user-info-type.ts'; // 유저 세부정보 저장
import { IdInfoForm } from './types/simple-id-type.ts'; // 단순 유저 id 저장

// 고정 변수
const User_Agent: string = "KAKAOROCKET/4.0.0_218 Android/9 SM-X700N";

// 가변 변수
var Kakao_DB: IdInfoForm = JSON.parse(fs.readFileSync('./data/KakaoQuickList.json', 'utf8'));		// 채널유저 목록
var All_DB: AllInfoForm = JSON.parse(fs.readFileSync('./data/AllList.json', 'utf8'));			// 통합데이터 목록


// 전체(LocalDB) 전용 환경변수
const Config = { User_Agent, Kakao_DB, All_DB };


Object.defineProperties(Config, {
    Kakao_DB: {
        get: () => Kakao_DB,
        set: (DBjson: IdInfoForm) => { Kakao_DB = DBjson; }
    },
    All_DB: {
        get: () => All_DB,
        set: (DBjson: AllInfoForm) => { All_DB = DBjson; }
    }
});

export default Config;