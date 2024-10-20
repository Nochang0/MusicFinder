// config.ts
import { Kakao_UserDB } from './types/kakao-type.ts';

// 고정 변수
const User_Agent: string = "KAKAOROCKET/4.0.0_218 Android/9 SM-X700N";

// 가변 변수
var Student_DB: Object;		// 학생 목록
var Kakao_DB: Kakao_UserDB;		// 채널유저 목록
var All_DB: Object;			// 통합데이터 목록

// 전체(LocalDB) 전용 환경변수
const Config = { User_Agent, Student_DB, Channel_DB, All_DB };

export default Config;