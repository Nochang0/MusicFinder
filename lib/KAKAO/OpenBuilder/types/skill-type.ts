// 채널 유저 채팅 구성 (공식 챗봇)
export interface SkillPayload {
	userRequest: {
		utterance: string; 						// 메세지 발화 (example: 안녕하세요)
		user: {
			id: string;							// 채널유저 ID (example: c455ce4752a257af311ae94d36a949f63c0aa867e8a52ce83556802731d6f66d94)
			type: string;						// 채널유저 타입 (example: botUserKey)
			properties: {
				plusfriendUserKey: string;		// plusId
				appUserId?: string; 			// app user id(?)
				isFriend: boolean;				// 친구추가 여부
			}
		},
		block: {
			id: string;							// 시나리오 블록 ID (example: 6449ca5e70b6c91aa2b57a6b)
			name: string;						// 시나리오 블록 명
		},
		params: {
			surface: string;					// 설정 (example: Kakaotalk.plusfriend)
		},
		lang: string | null;					// 언어 (example: ko)
		timezone: string;						// 시간대 (example: Asia/Seoul)
	},
	bot: {
		id: string;								// 챗봇 ID (example: 64495bce3339e26ec152803e)
		name: string;							// 챗봇 이름
	},
	intent: {
		id: string;								// 시나리오 블록 ID (example: 6449ca5e70b6c91aa2b57a6b)
		name: string;							// 시나리오 블록 명
		extra: {
			reason: Object[];					// 뭔지 모름
		}
	},
	action: {
		id: string;								// 스킬 ID (example: 64495c2f2f057266abfcfcfc)
		name: string;							// 스킬 명
		params: Object;							// 메세지의 파라미터 정보
		detailParams: Object;					// 메세지의 엔티티 정보
		clientExtra: Object | null;				// 메세지의 추가정보 (example: 바로가기 응답)
	},
	contexts: any[];
}


// 스킬 템플릿 V2
// export namespace SkillTemplate_V2 {
	
	// 템플릿 타입들
	export type TemplateType = SimpleText | SimpleImage | TextCard | BasicCard | CommerceCard | Carousel;
	
	// 버튼 동작 타입
	export type ButtonType = 'webLink' | 'message' | 'phone' | 'share' | 'block';
	
	// 카로셀 설정 타입
	export type CaroselType = 'basicCard' | 'commerceCard' | 'listCard' | 'itemCard';
	
	// 카로셀 아이템 배열 타입
	export type CaroselItemType = TextCard[] | BasicCard[] | CommerceCard[] | any[];
	
	
	// 기본 템플릿 구조
	export interface baseMold {
		version: string; 						// 2.0
		template: {
			outputs: any[];						// 요소: 1개 이상 3개 이하
			quickReplies?: [] | ButtonForm[];	// 요소: 10개 이하 (action, label, messageText만 들어감(?))
		}
	}
	
	// 카드 버튼 구성
	export interface ButtonForm {
		action: ButtonType;						// 동작 유형 (example: { webLink: url 이동, message: 메세지 보내기, phone: 전화하기, share: 카링 공유하기, block: 챗봇블록 상호작용 })
		label: string;							// 버튼 명
		webLinkUrl?: string;					// 리다이렉트 URL (webLink)
		messageText?: string;					// 보내게 할 메세지 (message)
		phoneNumber?: string;					// 전화번호 (phone, example: 010-1234-5678)
		blockId?: string;						// blockId를 갖는 블록호출 (바로가기 응답과 비슷)
	}
	
	// 카드 썸네일 구성
	export interface ThumbnailForm {
		imageUrl: string;						// 카드 상단 이미지 URL
		link?: {								// 이미지 클릭시 이동할 URL 설정 (web > pc | mobile (노출순위))
			pc?: string;						// PC 환경에 이동할 URL
			mobile?: string;					// 모바일 환경에 이동할 URL
			web?: string;						// 모든 환경 가능
		},
		fixedRatio?: boolean;					// 이미지 비율 (true: 1:1, false: 2:1 (default: false))
	}
	
	// 카드 프로필 구성
	export interface ProfileForm {
		nickname: string;	// 프로필 이름
		imageUrl?: string;	// 프로필 이미지
	}
	
	/* 템플릿 유형 */
	
	// context 구성 템플릿 (챗봇 블록 파라미터쪽인듯(?))
	export interface ContextControl {
		version: string;						// 2.0
		context: Object | {
			values?: [{
				name: string;					// 수정하려는 output 컨텍스트의 이름
				lifeSpan: number;				// 수정하려는 ouptut 컨텍스트의 lifeSpan
				ttl: number;					// 뭔지 모름 (example: 60)
				params: Object;					// output 컨텍스트에 저장하는 추가 데이터
			}]
		}
	}
	
	
	// 텍스트형
	export interface SimpleText {
		simpleText: {
			text: string;						// 메세지 텍스트
		}
	}
	
	// 이미지형
	export interface SimpleImage {
		simpleImage: {
			imageUrl: string;					// 이미지 URL
			altText: string;					// URL이 유효하지 않은 경우, 전달되는 텍스트
		}
	}
	
	// 텍스트 카드형
	export interface TextCard {
		textCard: {
			title?: string;						// 카드 제목 (진한 글씨)
			description?: string;				// 카드 상세 설명 (옅은 글씨)
			buttons?: [] | ButtonForm[];		// 버튼 설정
			forwardable?: boolean;				// 전달하기 ON/OFF
		}
	}
	
	// 기본 카드형
	export interface BasicCard {
		basicCard: {
			thumbnail: ThumbnailForm;			// 카드 상단 이미지
			title?: string;						// 카드 제목 (진한 글씨)
			description?: string;				// 카드 상세 설명 (옅은 글씨)
			buttons?: [] | ButtonForm[];		// 버튼 설정
			forwardable?: boolean				// 전달하기 ON/OFF
		}
	}
	
	/**
	 * 커머스 카드형
	 * dicountedPrice > discountRate > discount (노출 순위)
	 */
	export interface CommerceCard {
		commerceCard: {
			thumbnails: [] | ThumbnailForm[];	// 상품 사진 (1개만)
			price: number;						// 상품 가격
			title?: string;						// 카드 제목 (상품명, 진한 글씨)
			description?: string;				// 카드 상세 설명 (상품설명, 옅은 글씨)
			discount?: number;					// 할인할 금액 (빨간 글씨)
			discountRate?: number;				// 할인율 (With dicountedPrice X)
			dicountedPrice?: number;			// 할인가 (With discountRate X)
			currency?: string;					// 가격 통화 ('won'만 가능)
			profile?: ProfileForm;				// 프로필 설정
			buttons?: [] | ButtonForm[];		// 버튼 설정
			forwardable?: boolean				// 전달하기 ON/OFF
		}
	}
	
	/**
	 * 카로셀형
	 * 여러 장의 카드를 하나의 메세지에 일렬로 포함
	 */
	export interface Carousel {
		carousel: {
			type: CaroselType;					// 카로셀 타입
			items: CaroselItemType;				// 카로셀 아이템
			header?: {} | {						// 카로셀 헤더 (type이 TextCard, listCard는 지원 X)
				title: string;					// 카드 제목 (진한 글씨)
				description: string; 			// 카드 상세 설명 (옅은 글씨)
				thumbnail: ThumbnailForm;		// 카로셀 헤더 배경 이미지
			}
		}
	}

// }

// export namespace SkillTemplate_V1 {
// }

