// By StudentList.json

// 학생정보 저장 요소
export interface Inside_Student_Info {
	name: string;			// 이름
	Account: {
		classNum: string;
		password: string;
	};
}

// 학생정보 저장 요소 (나중에)
export interface Inside_Student_Info_Later {
	name: string;			// 이름
	grade: string;			// 학년
	major: string;			// 전공
	college: string;		// 대학(원)
	department: string;		// 학부(과)
	status: string;			// 휴학 / 재학 등
	isNight: boolean;		// 주야구분
	professor: string;		// 지도 교수
	Account: {
		classNum: string;
		password: string;
	};
}

// 전체 학생정보 저장
export interface Inside_Student_List {
	students: {
		[plusId: string]: Inside_Student_Info;
	}
}

