import * as fs from 'fs';
import * as path from 'path';
import Config from '../config.ts';
import { Kakao_UserForm } from '../types/kakao-type.ts';


class kakao {
	private static readonly filePath = path.join(__dirname, '..', 'data', 'KakaoQuickList.json');

	// DB 내용 츨력
	public static showDB(): Kakao_UserForm {
		return JSON.parse(fs.readFileSync(kakao.filePath, "utf-8"));
	}
	
	// DB 업데이트 (저장)
	private static saveDB(_DB_Data: Kakao_UserForm): boolean {
		try {
			fs.writeFileSync(kakao.filePath, JSON.stringify(_DB_Data, null, 2), 'utf-8');
			return true;
		} catch (error) {
			return false;
		}
	}
	
	// 유저 추가 (plusId: 채널 유저ID, roomId: 채널 유저 세션ID)
	public static addUser(plusId: string, roomId: string): boolean {
		try {
			const _updateData: Kakao_UserForm = kakao.showDB() || {};		// DB 내용 가져오기
			_updateData[plusId] = roomId;							// 유저 추가
			return kakao.saveDB(_updateData);						// 파일 업데이트 (저장)
		} catch (error) {
			return false;
		}
	}
	
	// 학생 삭제 (plusId: 채널 유저ID)
	public static deleteUser(plusId: string): boolean {
		try {
			const _updateData: Kakao_UserForm = kakao.showDB() || {};		// DB 내용 가져오기
			delete _updateData[plusId];								// 유저 삭제
			return kakao.saveDB(_updateData);						// 파일 업데이트 (저장)
		} catch (error) {
			return false;
		}
	}
	
}

export default kakao;