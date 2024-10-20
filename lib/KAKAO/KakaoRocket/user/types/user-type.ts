
/*
	전체: all
	진행중채팅: progress
	안읽은채팅: not-read
	미답변채팅: not-replied
	답변한채팅: replied
	완료된채팅: done
	차단된채팅: blocked
*/

// 채널 유저상태 구별타입
export type StatusType = 'all' | 'progress' | 'not-read' | 'not-replied' | 'replied' | 'done' | 'blocked';
	
// 채널 유저정보 배열 구성요소
export interface Inside_UserList {
	talk_user: {
		id: number;								// User Id (카톡 유저 ID)
		nickname: string;						// 유저 카톡 닉네임
		status_message: string;					// 상태 메세지
		active: boolean;						// 정지여부(?)
		user_type: number;						// example: 0 | 1 (뭔지 모름)
		deactivated_at: number;					// example: 0 (뭔지 모름)
		original_profile_image_url: string;		// 프로필 사진 주소 1
		profile_image_url: string;				// 프로필 사진 주소 2
		full_profile_image_url: string;			// 프로필 사진 주소 3
	},
	id: string;									// Room ID (채널 유저 접속 세션 ID)
	is_friend: boolean;							// 채널 친구추가 여부
	is_blocked: boolean;						// 차단 여부 (관리자 기준)
	is_starred: boolean;						// 즐겨찾기 여부 (관리자 기준)
	is_user_left: boolean;						// 유저가 채널을 완전히 나갔는 지 여부 (유저 기준)
	last_message: string;						// 마지막 대화 텍스트 (유저 기준)
	profile_id: number;							// 채널 카톡 프로필 Id (카톡 채널유저 ID)
	encoded_profile_id: string;					// 채널 프로필 Id
	name: string;								// 유저 카톡 닉네임
	last_seen_log_id: string;					// 가장 나중에 읽은 유저 메세지 ID (관리자 기준, 0은 읽기 X)
	created_at: number;							// 가입 날 (타임스탬프) (채널 대화 시작 또는 카톡 가입 일 중 하나인듯)
	is_replied: boolean;						// 관리자 챗으로 직접 대화한 적 있는지 여부(?)
	unread_count: number;						// 안 읽은 채팅 수 (관리자 기준)
	updated_at: number;							// example: 타임스탬프 (관리자 앱 접속 시간(?))
	assignee_id: number;						// example: 0 (뭔지 모름)
	last_log_id: string;						// 마지막 대화 메세지 ID (유저 기준)
	is_done: boolean;							// 상담 완료 여부 (관리자 기준)
	version: number;							// example: 타임스탬프 (뭔지 모름)
	last_log_send_at: string;					// example: 타임스탬프 (뭔지 모름)
	chat_label_ids: any[];						// example: [] (뭔지모름)
}

// 채널 유저정보 전체 배열 (원본 JSON 구성)
export interface Inside_UserListForm {
	has_next: boolean;							// 유저정보 누락 여부 (남은 정보가 있는지 여부(?))
	items: Inside_UserList[] | any[];			// 유저정보 배열 (채널에 유저가 없을 시: any[] | Inside_UserList[])
}

// 유저 상세정보 요소
export interface Inside_UserInfo extends Inside_UserList {
	chat_key: string;							// example: fea9e168599fce7fe58097ea603339baef5ec23c (뭔지 모름)
}

