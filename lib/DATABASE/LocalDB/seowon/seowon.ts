import * as fs from 'fs';
import Config from '../../config.ts';
import { Kakao_UserDB } from '../types/student-type.ts';


Config.Student_DB = fs.readFileSync("../data/StudentList.json", "utf-8");


class seowon {
	public static getDB() {
		const: Object = fs.readFileSync()
	}
	
	// 학생 추가 (plusId: 채널 유저ID, UserList: 채널 유저목록, TalkList: 대화내역)
	public static addStudent(plusId: string, UserList: any, TalkList: any) {
		const _data: string = Config.Student_DB;
		
	}
	
}

export default seowon;