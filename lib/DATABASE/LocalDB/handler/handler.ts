import * as fs from 'fs';
import * as path from 'path';
import Config from '../config.ts';
import { IdInfoForm } from '../types/simple-id-type.ts'; // 단순 유저 id 저장
import { AllInfoForm } from '../types/user-info-type.ts'; // 유저 세부정보 저장

/**
 * 유저 세부정보를 받게함
 * 받은 정보의 plusId로 심플 DB를 통해 이미 유저 정보가 있나 확인
 * 확인 후 없으면 추가하고 있으면 'already' 이런식으로 문자열 리턴을 통해 알리기
 * 저장은 한 번에 두 가지 DB 파일에 동시에 한다.
 */

class Handler {
	// 단순 Id DB (파일경로)
	private static readonly SimpleDBPath = path.join(__dirname, '..', 'data', 'KakaoQuickList.json');
	
	// 세부정보 DB (파일경로)
	private static readonly AllDBPath = path.join(__dirname, '..', 'data', 'AllList.json');



	// DB 내용 출력
	public static showDB(option: string): IdInfoForm | AllInfoForm | false {
		// 심플 DB
		if (option == 'simple') {
			const data: IdInfoForm = JSON.parse(fs.readFileSync(Handler.SimpleDBPath, "utf-8"));
			return data;
		}
		// 세부정보 DB
		else if (option == 'all') {
			const data: AllInfoForm = JSON.parse(fs.readFileSync(Handler.AllDBPath, "utf-8"));
			return data;
		} else {
			return false;
		}
	}
	
	// DB 업데이트 (저장)
	private static saveDB(simpleDB: IdInfoForm, allDB: AllInfoForm): boolean {
		try {
			// 심플 DB
			fs.writeFileSync(Handler.SimpleDBPath, JSON.stringify(simpleDB, null, 2), 'utf-8');

			// 통합 DB
			fs.writeFileSync(Handler.AllDBPath, JSON.stringify(allDB, null, 2), 'utf-8');
			return true;
		} catch (e) {
			console.log('2');
			console.log(String(e));
			return false;
		}
	}
	
	// 유저 추가 (plusId: 채널 유저ID, roomId: 채널 유저 세션ID)
	public static addUser(plusId: string, SendInfoData: AllInfoForm): boolean {
		try {
			// 단순 DB 데이터 읽음
			const simpleDB: AllInfoForm | IdInfoForm | false = Handler.showDB('simple') || {};

			// 통합 DB 데이터 읽음
			const allDB: AllInfoForm | IdInfoForm | false = Handler.showDB('all') || {};		// DB 내용 가져오기
			if (typeof simpleDB === "boolean" || typeof allDB === "boolean") return false;

			// 각각 DB 유저 추가
			Object.assign(simpleDB, { [plusId]: SendInfoData[plusId].roomId });
			Object.assign(allDB, SendInfoData);

			Handler.saveDB(simpleDB as IdInfoForm, allDB as AllInfoForm);						// 파일 업데이트 (저장)
			return true;
		} catch (e) {
			console.log('1');
			console.log(String(e));
			return false;
		}
	}
	
	// 학생 삭제 (plusId: 채널 유저ID)
	public static deleteUser(plusId: string, SendInfoData: AllInfoForm): boolean {
		try {
			// 단순 DB 데이터 읽음
			const simpleDB: AllInfoForm | IdInfoForm | false = Handler.showDB('simple') || {};

			// 통합 DB 데이터 읽음
			const allDB: AllInfoForm | IdInfoForm | false = Handler.showDB('all') || {};		// DB 내용 가져오기
			if (typeof simpleDB === "boolean" || typeof allDB === "boolean") return false;

			// 각각 DB에서 유저 삭제
			delete simpleDB[plusId];
			delete allDB[plusId];

			Handler.saveDB(simpleDB as IdInfoForm, allDB as AllInfoForm);						// 파일 업데이트 (저장)
			return true;
		} catch (e) {
			console.log(String(e));
			return false;
		}
	}
	
}

export default Handler;