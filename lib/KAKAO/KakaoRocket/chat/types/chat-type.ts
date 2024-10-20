
// 카카오톡 채널 로그인 토큰 구성요소
export interface Inside_ChatSendResponse {
	profile_id: number;							// 채널 카톡 프로필 Id (카톡 채널유저 ID, 관리자 기준)
	chat_id: string;							// Room ID (채널 유저 접속 세션 ID)
	type: string;								// 보낸 메세지 타입 (관리자 기준)
	message: string;							// 보낸 메세지 텍스트 (관리자 기준)
	attachment: Object;							// 메세지 첨부요소 (관리자 기준)
	id: string;									// 마지막 대화 메세지 ID (유저 기준)
	prev_id: string;							// example: 3221712912386058240 (뭔지 모름)
	send_at: number;							// example: 타임스탬프 (관리자 앱 접속 시간(?))
	author_id: number;							// 채널 카톡 프로필 Id (카톡 채널유저 ID, 관리자 기준)
	author: {
		id: number;								// 채널 카톡 프로필 Id (카톡 채널유저 ID, 관리자 기준)
		nickname: string;						// 채널 닉네임
		status_message: string;					// 채널 상태 메세지
		active: boolean;						// 정지여부(?)
		user_type: number;						// example: 0 (뭔지 모름)
		deactivated_at: number;					// example: 0 (뭔지 모름)
		original_profile_image_url: string;		// 프로필 사진 주소 1
		profile_image_url: string;				// 프로필 사진 주소 2
		full_profile_image_url: string;			// 프로필 사진 주소 3
	},
	manager: {
		id: string;								// 채널 매니저(관리자) ID(?)
		name: string;							// 채널 매니저(관리자) 이름
	},
	supplement: {
		muid: number;							// example: 1511566594 (mobile uid(?))
	}
}

// 유저 대화내역 구성요소
export interface Inside_ChatList extends Inside_ChatSendResponse {}

export interface Inside_ChatListForm {
	has_next: boolean;							// 대화내역 누락 여부 (남은 정보가 있는지 여부(?))
	items: Inside_ChatList[] | any[];			// 대화내역 배열 (채널에 유저가 없을 시: any[] | Inside_ChatList[])
}

// 카카오톡 메세지 타입 상수
export enum KakaoChatType {
	FEED = 0,
	TEXT = 1,
	PHOTO = 2,
	VIDEO = 3,
	CONTACT = 4,
	AUDIO = 5,
	DITEMEMOTICON = 6,
	DITEMGIFT = 7,
	DITEMIMG = 8,
	KAKAOLINKV1 = 9,
	AVATAR = 11,
	STICKER = 12,
	SCHEDULE = 13,
	VOTE = 14,
	LOTTERY = 15,
	MAP = 16,
	PROFILE = 17,
	FILE = 18,
	STICKERANI = 20,
	NUDGE = 21,
	ACTIONCON = 22,
	SEARCH = 23,
	POST = 24,
	STICKERGIF = 25,
	REPLY = 26,
	MULTIPHOTO = 27,
	VOIP = 51,
	LIVETALK = 52,
	CUSTOM = 71,
	ALIM = 72,
	PLUSFRIEND = 81,
	PLUSEVENT = 82,
	PLUSFRIENDVIRAL = 83,
	OPEN_SCHEDULE = 96,
	OPEN_VOTE = 97,
	OPEN_POST = 98
}

// 카카오톡 메세지 타입
export type ChatType = KakaoChatType | number;

export function getOriginalType(type: ChatType): ChatType {
	return type & 0xffffbfff;
}

