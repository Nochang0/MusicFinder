import * as fs from 'fs';
import kakao from './kakao/kakao.ts';

class LocalDB {
	static kakao = kakao;
}

export default LocalDB;